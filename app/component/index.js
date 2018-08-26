import Button from './button'
import Pagination from './pagination'
import Input from './input'
import DatePicker from './datepicker'
import Space from './space'
import PageCommonPassport from './pageCommon/passport'
import PageCommonCeiling from './pageCommon/ceiling'
import PageCommonLoading from './pageCommon/loading'
import PageCommonReturnTop from './pageCommon/returnTop'
import Modal from './modal'
import Message from './message'
import Form from './form'
import Upload from './upload'
import Editor from './eidtor'
import Table from './table'
import Select from './select'
import Textarea from './textarea'
import Radio from './radio'

module.exports = {
	Button,
	Pagination,
	Input,
	DatePicker,
	Space,
	PageCommon: {
		Passport: PageCommonPassport,
		Ceiling: PageCommonCeiling,
		Loading: PageCommonLoading,
		ReturnTop: PageCommonReturnTop,
	},
	Modal,
	Message,
	Form,
	Upload,
	Editor,
	Table,
	Select,
	Textarea,
	Radio,
}