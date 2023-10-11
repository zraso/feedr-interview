# Feedr Technical Challenge

Thank you for taking the time to attempt this challenge.

These tests are used to evaluate candidates of all skill levels so please complete them to a level you feel is an accurate representation of your skill set.

Please read `README-FRONTEND.md` for further instructions.

If you have any questions or would like to clarify any details, please email richard.stevens@feedr.co.

Good luck!

# Quick Start
Fork the repository, clone it to your local system, then:

## Install dependencies
yarn (or npm install)

## Start development server
yarn dev (or npm run dev)

## Run tests
yarn test (or npm run test)

## Notes

### Component structure
* I extracted two components, Item and PreviewItem. I did debate whether to have just one Item component as the main difference is that PreviewItem has the 'remove' functionality. However, in the interest of time I chose to seperate them to keep the logic and rendering simple.
* Again, with more time, I would have also liked to extract components for the Menu Preview container, Sidebar container, Dietary Count and Items Count.
* I decided to structure each component with its own .css file, as I normally find this folder structure really clear and easy for other developers to navigate. I would have liked to spend a bit more time removing some of the repetition between the .css files for the components and App.

### Data management
* The data on this app is mainly managed using the `useState` hook. I believe that for the requirements of this task, this is a satisfactory system for managing the data from the server.

### Testing plan
* The key test cases I wanted to check on this are:
- That the App component renders successfully
- That an item is removed from the Menu Preview when the 'x' button is clicked
- That the dietary counts are displayed correctly based on the selected items
- That data is fetched correctly using the `fetchItemsData` function
- That the number of items is displayed correctly based on the total selected items

I initially approached testing using `data-testid` to access elements in the code. However, I ran in to some problems accessing some of the elements rendered via the `.map` function, and firing events via React Testing Library. I started exploring creating a `TestApp` that could mock some of the data being returned, though I don't believe this is the best solution. With more time, I would have liked to continue using the mockData, but to resolve the missing elements with better component structure. Firing events are probably a deeper issue with the testing library, so I would continue to investigate alternative methods to resolve this.