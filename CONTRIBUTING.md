Target the development branch
=============================
When opening a pull request, compare with the `development` branch, rather than `master`. The master branch is aimed at being equal to the latest stable release; meaning all staged changes need to go into the `development` branch.

Run ESLint
==========
To try and keep a consistent coding style, make sure [ESLint](https://eslint.org/) gives your coding style a thumbs up.

Update Unit Tests
=================
If you're familiar with [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) then please update unit tests or introduce new ones where you can.

At minimum, please run the unit tests (`yarn jest`) to make sure that your changes don't have any unexpected effects on other components.
