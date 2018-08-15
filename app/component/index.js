import Button from './button'
import Pagination from './pagination'
import Input from './input'
import DatePicker from './datepicker'
import Space from './space'
import PageCommonPassport from './pageCommon/passport'
import PageCommonCeiling from './pageCommon/ceiling'
import Modal from './modal'
import Message from './message'
import Form from './form'
import Upload from './upload'
import Editor from './eidtor'
import Table from './table'

module.exports = {
	Button,
	Pagination,
	Input,
	DatePicker,
	Space,
	PageCommon: {
		Passport: PageCommonPassport,
		Ceiling: PageCommonCeiling,
	},
	Modal,
	Message,
	Form,
	Upload,
	Editor,
	Table,
}