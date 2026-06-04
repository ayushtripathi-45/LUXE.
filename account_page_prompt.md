# AI Coding Task: Create a Frontend-Only Account (Login/Signup) Page/Modal

## Project Context
This is a web project using **Vite** and **Tailwind CSS**. 
The goal is to add a purely frontend Account (Login/Signup) flow that is triggered when a user attempts to purchase a product. **There is no backend involved.**

## Core Requirements

1. **Triggering the Flow**
   - Locate the "Buy Now" and/or "Checkout" buttons in the existing product page UI.
   - Add click event listeners to these buttons.
   - When clicked, instead of proceeding directly, they should open the Account Login/Signup interface.

2. **The Account Interface (Modal or Page)**
   - Create a polished, responsive UI using Tailwind CSS for the Login and Signup forms. A modal/overlay approach is recommended to avoid needing a routing library, but a separate page component is also acceptable if it fits the architecture.
   - The interface must include a clear "Close" or "Back" button so the user can return to the product page without logging in.

3. **Login & Signup States**
   - **Login State:** Should have fields for Email/Username and Password, and a "Login" submit button.
   - **Signup State:** Should have fields for Full Name, Email, Password, and Confirm Password, along with a "Sign Up" submit button.
   - Include toggle buttons/links to switch seamlessly between the "Login" and "Signup" states (e.g., "Don't have an account? Sign up here").

4. **Frontend Functionality (No Backend)**
   - Implement basic HTML5 or JavaScript form validation (e.g., making fields required, validating email format, ensuring passwords match during signup).
   - Upon form submission, prevent the default page reload (`e.preventDefault()`).
   - Simulate a successful authentication event (e.g., display a Tailwind-styled success toast/alert saying "Login Successful" or "Account Created").
   - After "successful" submission, automatically close the Account interface and ideally trigger the original checkout flow or show a success state.

## Aesthetics and Styling
- Ensure the design is modern and matches an E-Commerce aesthetic.
- Use Tailwind CSS utility classes for styling.
- Include hover and focus states for all interactive elements (inputs, buttons).
- Use smooth transitions (e.g., `transition-all duration-300`) when toggling between Login and Signup states or showing validation errors.

## Execution Instructions for the AI
1. Analyze the existing HTML structure and identify the "Buy Now" or "Checkout" buttons.
2. Inject the HTML for the Login/Signup modal (either directly into the DOM or via JavaScript).
3. Write the necessary JavaScript to handle the modal opening/closing, state toggling between Login and Signup, and the mock form submissions.
4. Ensure all new UI elements are styled cleanly using the existing Tailwind setup.
