import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Form, Input, Spin } from 'aliasComponent'
import { fetchUserCategoryList, userCreateCategory, userEditCategory, userDeleteArticle } from 'aliasServer/category'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList: null,
			currentCategoryId: null,
			currentEditCategory: {},
			isFetching: true,
		}
		this._onAddCategory = this._onAddCategory.bind(this)
		this._onSubmitAddCategory = this._onSubmitAddCategory.bind(this)
	}

	componentDidMount() {
		this.fetchCategory()
	}

	onChangeCategory(categoryId) {
		this.setState({
			currentCategoryId: categoryId
		})
		this.props.onChangeCategory && this.props.onChangeCategory(categoryId)
	}

	_onAddCategory() {
		this.setState({
			currentEditCategory: {}
		})
		this.refs.addCategory.show()
	}

	onEditCategory(evt, category) {
		evt.stopPropagation()
		const { id, name } = category
		this.setState({
			currentEditCategory: { id, name }
		})
		this.refs.addCategory.show()
	}

	// onDelCategory(evt, category) {
	// 	evt.stopPropagation()
	// 	this.setState({
	// 		isFetching: true
	// 	})
	// 	const { id } = category
	// 	userDeleteArticle(id)
	// 		.then(() => {
	// 			const { categoryList } = this.state
	// 			const lasCat = categoryList.pop()
	// 			const lastCatId = lasCat ? lasCat.id : null
	// 			this.setState({
	// 				currentCategoryId: lastCatId,
	// 				categoryList,
	// 				isFetching: false,
	// 			})
	// 		})
	// }

	_onSubmitAddCategory(evt, data) {
		evt.preventDefault()
		const { currentEditCategory } = this.state
		const  submitFunc = currentEditCategory.id ? userEditCategory: userCreateCategory

		submitFunc({ ...currentEditCategory, ...data })
			.then(() => {
				this.refs.addCategory.close()
				this.fetchCategory()
			})
	}

	fetchCategory() {
		fetchUserCategoryList()
			.then((res) => {
				const state = { categoryList: res, isFetching: false }
				const categoryId = res && res.length && res[0].id
				if (categoryId) {
					this.onChangeCategory(categoryId)
				}
				this.setState(state)
			})
	}

	renderOperation(category) {
		return (
			<span className='category-operation-wrap'>
				<i className='iconfont icon-setting'></i>
				<div className='category-operation'>
					<em></em>
					<a onClick={evt => this.onEditCategory(evt, category)}>修改</a>
				</div>
			</span>
		)
	}
  
	render() {
		const { categoryList, currentCategoryId, isFetching, currentEditCategory } = this.state
		return (
			<div className='article-add-child-category'>
				<p className='wrap-btn'>
					<Link to='/'>
						<Button title='回到首页' />
					</Link>
				</p>
				<Spin isFetching={isFetching}>
					<ul className='category-ul'>
						<li onClick={this._onAddCategory}> <strong>+</strong> 新建类目</li>
						{
							categoryList && categoryList.map((category, index) => {
								const isCurrentActiveCategory = category.id === currentCategoryId
								return (
									<li className={isCurrentActiveCategory ? 'active' : ''} key={index}
										onClick={() => this.onChangeCategory(category.id)}
									>
										<span>{category.name}</span>
										{ isCurrentActiveCategory ? this.renderOperation(category) : null}
									</li>
								) 
							})
						}
					</ul>
				</Spin>
				<Modal title={currentEditCategory.id ? '编辑类目' : '新建类目'} ref='addCategory' onOK={(...args) => this.refs.form._onSubmit(...args)}>
					<Form onSubmit={this._onSubmitAddCategory} ref='form'>
						<Form.Field label='名称' name='name' required>
							<Input placeholder='类目名称' value={currentEditCategory.name}/>
						</Form.Field>
					</Form>
				</Modal>
			</div>
		)
	}
}