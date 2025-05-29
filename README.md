# Lab 1 - Expo/React Native Environment Setup

This lab focuses on getting familiar with the Expo/React Native environment, modifying HTML code, and writing TypeScript code to display group member information.

## Assignment Objectives
- Set up Expo/React Native development environment
- Create a simple UI with View and Text components
- Work with TypeScript objects and arrays
- Implement mapping functionality to display data
- Add user interaction with Pressable components
- Use Git for version control and collaboration

## Technologies Used
- React Native
- TypeScript
- Expo
- Node.js
- Visual Studio Code
- Expo Go (mobile app)

## Features Implemented
- **Group Member Display**: List of all group members with their details
- **TypeScript Objects**: Properly typed group member data structure
- **Array Mapping**: Dynamic rendering of group member information
- **Interactive Element**: Pressable text with alert functionality
- **Simple UI Layout**: Clean presentation using View and Text components

## Project Structure
```
lab1/
├── App.tsx              # Main application file with group member list
├── package.json         # Dependencies and project configuration
├── node_modules/        # Installed packages
└── README.md           # This documentation
```

## Data Structure
Each group member object follows this TypeScript signature:
```typescript
{
  name: string,
  github_repo: string, 
  group_no: string
}
```

## Setup Instructions

### Prerequisites
- **Node.js LTS** installed
- **Visual Studio Code** installed  
- **Expo Go** app installed on mobile device

### Installation Steps
1. **Create Expo Project:**
   ```bash
   npx create-expo-app@latest --template
   ```
   - Select the **TypeScript template** for a blank project with TypeScript

2. **Start the Project:**
   ```bash
   npx expo start
   ```

3. **Open in Mobile:**
   - Open Expo Go app on your phone
   - Scan the QR code displayed in terminal/browser

## Implementation Details

### App.tsx Components
- **View Container**: Main layout wrapper
- **Text Elements**: Display group member names and information
- **Pressable Component**: Interactive element for lab completion
- **Alert Functionality**: Shows "Lab 1 done" message when pressed

### TypeScript Implementation
- **Object Array**: List containing all group member details
- **Map Function**: Iterates through group members to display names
- **Type Safety**: Proper TypeScript typing for all data structures

## How to Use
1. **Launch the app** using Expo Go
2. **View group member list** displayed on screen
3. **Read through member names** rendered from the mapped array
4. **Tap the pressable text** at the bottom to trigger completion alert
5. **See "Lab 1 done" alert** confirming successful interaction

## Code Features
- **Mapping Over Arrays**: Demonstrates JavaScript/TypeScript array methods
- **Component Structure**: Proper React Native component organization  
- **Event Handling**: Anonymous function or event handler for user interaction
- **TypeScript Types**: Strongly typed object definitions
- **Mobile-First Design**: Optimized for mobile viewing through Expo Go

## Learning Outcomes Achieved
- Successfully set up Expo/React Native development environment
- Created functional UI components using View and Text
- Implemented TypeScript object arrays with proper typing
- Used JavaScript map() function to render dynamic content
- Added user interaction with Pressable and Alert components
- Practiced Git workflow and repository management
- Collaborated effectively using shared GitHub repository

## Git & Collaboration
- **Shared Repository**: Collaborative development using GitHub
- **Public Repository**: Accessible for submission and review
- **Version Control**: Proper Git workflow for team development
- **Code Sharing**: Team members can access and contribute to codebase

## Submission Requirements
✅ Modified App.tsx with View and Text tags  
✅ Created TypeScript object array with group member details  
✅ Implemented mapping to display all group member names  
✅ Added pressable text with "Lab 1 done" alert  
✅ Pushed code to shared public GitHub repository  
✅ Submitted GitHub repository link  

## Group Information
**Group Members:**
- [List will be populated with actual group member names from the mapped array]

## Author
Anne Marie Ala, Samuel Braun, Merilyn Mbong
Software Development Student, SAIT  
CPRG 303B - Mobile Application Development

## Repository
GitHub Repository: https://github.com/annieala/CPRG303B-Labs



---
*This lab demonstrates foundational React Native and TypeScript skills as part of the CPRG 303B course curriculum at Southern Alberta Institute of Technology (SAIT).*
