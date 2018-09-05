import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Form, Input, Spin } from 'aliasComponent'
import { fetchUserCategoryList, userCreateCategory } from 'aliasServer/category'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList: null,
			currentCategoryId: null,
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
		this.refs.addCategory.show()
	}

	_onSubmitAddCategory(evt, data) {
		evt.preventDefault()
		userCreateCategory(data)
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
  
	render() {
		const { categoryList } = this.state
		return (
			<div className='article-add-child-category'>
				<p className='wrap-btn'>
					<Link to='/'>
						<Button title='回到首页' />
					</Link>
				</p>
				<Spin isFetching={this.state.isFetching}>
					<ul className='category-ul'>
						<li onClick={this._onAddCategory}> <strong>+</strong> 新建类目</li>
						{
							categoryList && categoryList.map((category, index) => {
								return (
									<li className={category.id === this.state.currentCategoryId ? 'active' : ''} key={index}
										onClick={() => this.onChangeCategory(category.id)}
									>{category.name}</li>
								)
							})
						}
					</ul>
				</Spin>
				<Modal title='新建类目' ref='addCategory' onOK={(...args) => this.refs.form._onSubmit(...args)}>
					<Form onSubmit={this._onSubmitAddCategory} ref='form'>
						<Form.Field label='名称' name='name' required>
							<Input placeholder='类目名称' />
						</Form.Field>
					</Form>
				</Modal>
			</div>
		)
	}
}