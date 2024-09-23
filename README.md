# Restaurant Menu Project

This project is a restaurant menu application with cart functionality.

## Installation

To install the project dependencies, run:

```
npm i
```

## Running Locally

To run the project on your local machine:

```
npm run dev
```

This will start the development server, typically on `http://localhost:3000`.

## Deployed Version

The application is deployed and can be accessed at:

[https://restaurant-menu-one-alpha.vercel.app/](https://restaurant-menu-one-alpha.vercel.app/)

## Tech Stack

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Jest**: A testing framework for JavaScript.

## Testing

To run the test suite:

```
npm run test
```

For test coverage information:

```
npm run coverage
```
Below is the test coverage report for the current implementation:

| File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|------------------|---------|----------|---------|---------|-------------------|
| **All files**     |   99.53 |    96.22 |     100 |   99.53 |                   |
| **app/icons**     |     100 |      100 |     100 |     100 |                   |
| BackArrow.tsx     |     100 |      100 |     100 |     100 |                   |
| SearchIcon.tsx    |     100 |      100 |     100 |     100 |                   |
| **components**    |   99.46 |    96.07 |     100 |   99.46 |                   |
| Basket.tsx        |     100 |      100 |     100 |     100 |                   |
| Drawer.tsx        |     100 |      100 |     100 |     100 |                   |
| MenuList.tsx      |     100 |      100 |     100 |     100 |                   |
| MenuPage.tsx      |   98.57 |    89.47 |     100 |   98.57 | 59-60             |

## Test Results

- **Test Suites**: 4 passed, 4 total
- **Tests**: 30 passed, 30 total
- **Snapshots**: 0 total
- **Time**: 1.457 s, estimated 2 s

## Design Additions
<img width="292" alt="Screenshot 2024-09-23 at 3 29 03 PM" src="https://github.com/user-attachments/assets/f7cbdf14-c39f-47c7-8eeb-54dd894928d0">
<img width="292" alt="Screenshot 2024-09-23 at 3 35 13 PM" src="https://github.com/user-attachments/assets/24f8a4ee-9a29-4c93-a7e5-485f01fe35a9">


The following design elements have been added to enhance user experience:

1. **Cart Drawer**: An extra drawer has been implemented to display the contents of the user's basket.

2. **Cart Icon**: A cart icon has been added, which, when clicked, opens the cart drawer.

3. **Item Quantity Controls**:
   - "+" button: Increases the quantity of an item in the cart
   - "-" button: Decreases the quantity of an item in the cart or removes it if the quantity becomes zero

These additions provide a more interactive and user-friendly interface for managing the shopping cart.
