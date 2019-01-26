import React from 'react'
import { shallow, mount } from 'enzyme'
import ReduxWrapper from '~/test/helpers/ReduxWrapper'
import CookBook from './CookBook'
import CookBookItem from '~/components/CookBookItem'

describe('<CookBook />', () => {
  const cookBookDouble = [{
    id: 'DummyRecipe-0001',
    className: 'DummyRecipe'
  }, {
    id: 'DummyRecipe-0002',
    className: 'DummyRecipe',
    disabled: true
  }, {
    id: 'DummyRecipe-0003',
    className: 'DummyRecipe',
    valid: false
  }]

  let wrapper, updateCookBook, disableRecipe, setRecipeProperty, deleteRecipe

  beforeEach(() => {
    updateCookBook = jest.fn()
    disableRecipe = jest.fn()
    setRecipeProperty = jest.fn()
    deleteRecipe = jest.fn()

    wrapper = mount(
      <ReduxWrapper>
        <CookBook
          cookBook={cookBookDouble}
          updateCookBook={updateCookBook}
          disableRecipe={disableRecipe}
          setRecipeProperty={setRecipeProperty}
          deleteRecipe={deleteRecipe}
        />
      </ReduxWrapper>
    )
    wrapper.update()
  })

  it('should not render children', () => {
    const wrapper = mount(
      <ReduxWrapper>
        <CookBook cookBook={cookBookDouble}>
          <div className="test"></div>
        </CookBook>
      </ReduxWrapper>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a <CookBookItem /> for each item in `props.cookBook`', () => {
    let items = wrapper.find('CookBookItem')
    expect(items).toHaveLength(3)
    expect(items.at(0).props().id).toEqual('DummyRecipe-0001')
    expect(items.at(1).props().id).toEqual('DummyRecipe-0002')
    expect(items.at(2).props().id).toEqual('DummyRecipe-0003')
  })

  it('should pass `props.cookBook` to each <CookBookItem />', () => {
    let items = wrapper.find('CookBookItem')
    expect(items.at(0).props().cookBook).toBe(cookBookDouble)
  })

  it('should pass `props.disableRecipe` to each <CookBookItem />', () => {
    let items = wrapper.find('CookBookItem')
    expect(items.at(0).props().disableRecipe).toBe(disableRecipe)
  })

  it('should pass `props.setRecipeProperty` to each <CookBookItem />', () => {
    let items = wrapper.find('CookBookItem')
    expect(items.at(0).props().setRecipeProperty).toBe(setRecipeProperty)
  })

  it('should pass `props.deleteRecipe` to each <CookBookItem />', () => {
    let items = wrapper.find('CookBookItem')
    expect(items.at(0).props().deleteRecipe).toBe(deleteRecipe)
  })

  it('should pass the disabled state of an item to each corresponding <CookBookItem />', () => {
    let items = wrapper.find('CookBookItem')
    expect(items.at(0).props().disabled).not.toBeDefined()
    expect(items.at(1).props().disabled).toBe(true)
    expect(items.at(2).props().disabled).not.toBeDefined()
  })

  it('should invoke `props.updateCookBook` after the item order is changed', () => {
    wrapper.find('CookBook').instance().onSortEnd({
      oldIndex: 0,
      newIndex: 1
    })

    expect(updateCookBook).toHaveBeenCalledWith([
      cookBookDouble[1],
      cookBookDouble[0],
      cookBookDouble[2]
    ])
  })
})
