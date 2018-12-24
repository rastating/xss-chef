import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addRecipe } from '~/actions/CookBook'

import RecipeList from '~/components/RecipeList'

function mapStateToProps (state) {
  return {
    cookBook: state.cookBook
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addRecipe
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
