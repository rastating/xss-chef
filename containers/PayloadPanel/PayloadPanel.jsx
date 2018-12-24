import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PayloadPanel from '~/components/PayloadPanel'

function mapStateToProps (state) {
  return {
    cookBook: state.cookBook
  }
}

export default connect(mapStateToProps, null)(PayloadPanel)
