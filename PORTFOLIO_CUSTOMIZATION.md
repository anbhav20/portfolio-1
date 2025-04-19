# Portfolio Customization Guide

This document provides instructions on how to customize your portfolio website, particularly how to add your photo, CV, and other personal information.

## Directory Structure

Before we begin, it's important to understand the file structure for your assets:

```
client/
└── public/
    └── assets/
        ├── images/
        │   ├── profile.jpg         (Your profile photo)
        │   └── projects/
        │       ├── project1.jpg    (Project thumbnails)
        │       ├── project2.jpg
        │       └── project3.jpg
        └── Abhishek_Resume.pdf     (Your CV/resume)
```

## Adding Your Photo

1. **Prepare your profile photo**:
   - Choose a high-quality, professional headshot.
   - Recommended size: at least 500x500 pixels (square format works best).
   - Save it as "profile.jpg" (or change the path in the code).

2. **Create directories and add the photo**:
   ```bash
   # Create directories if they don't exist
   mkdir -p client/public/assets/images
   
   # Add your photo to the correct location
   # (Assuming your photo is on your local machine)
   cp /path/to/your/photo.jpg client/public/assets/images/profile.jpg
   ```

3. **Update the photo path (optional)**:
   - If you want to use a different filename, open `client/src/components/HeroSection.tsx`
   - Find `profileData` at the top of the file
   - Update the `profileImage` path to match your file name:
     ```typescript
     // Example
     profileImage: "/assets/images/your-filename.jpg",
     ```

## Adding Your CV/Resume

1. **Prepare your CV/Resume**:
   - Save your CV as a PDF file.
   - Recommended: Name it clearly, e.g., "YourName_Resume.pdf".

2. **Add the CV to the assets folder**:
   ```bash
   # Copy your CV to the assets directory
   cp /path/to/your/resume.pdf client/public/assets/YourName_Resume.pdf
   ```

3. **Update the CV path in two places**:
   - Open `client/src/components/HeroSection.tsx` and update the `cvPath` in `profileData`:
     ```typescript
     cvPath: "/assets/YourName_Resume.pdf"
     ```
   - Open `client/src/components/Header.tsx` and update the CV link in both the desktop and mobile navigation menus:
     ```typescript
     // Update this line in the desktop navigation
     <a href="/assets/YourName_Resume.pdf" ...>CV</a>
     
     // Also update the mobile navigation at the bottom of the file
     <a href="/assets/YourName_Resume.pdf" ...>CV</a>
     ```

## Adding Project Images

1. **Create the projects directory**:
   ```bash
   mkdir -p client/public/assets/images/projects
   ```

2. **Add your project screenshots/thumbnails**:
   ```bash
   cp /path/to/project-image.jpg client/public/assets/images/projects/
   ```

3. **Update project data**:
   - Open `client/src/components/ProjectsSection.tsx`
   - Find the `projects` array and update the `imageUrl` paths for each project:
     ```typescript
     imageUrl: "/assets/images/projects/your-project-image.jpg",
     ```

## Customizing Your Personal Information

1. **Update your name and titles**:
   - Open `client/src/components/HeroSection.tsx`
   - Edit the `profileData` object:
     ```typescript
     const profileData = {
       name: "Your Name",
       titles: [
         "Hi!", 
         "I'm Your Name.", 
         "I'm a Web Developer.", 
         "I'm a Designer."
       ],
       bio: "Your short bio goes here...",
       profileImage: "/assets/images/profile.jpg",
       cvPath: "/assets/YourName_Resume.pdf"
     };
     ```

2. **Update header and website name**:
   - Open `client/src/components/Header.tsx`
   - Change the website name/logo:
     ```typescript
     YourName<span className="text-gray-700">.dev</span>
     ```

3. **Update project information**:
   - Open `client/src/components/ProjectsSection.tsx`
   - Edit the `projects` array with your own projects' details:
     ```typescript
     const projects: Project[] = [
       {
         id: 1,
         title: "Your Project Title",
         description: "Description of your project...",
         imageUrl: "/assets/images/projects/your-project.jpg",
         link: "https://your-project-url.com",
         sourceCodeLink: "https://github.com/yourusername/your-repo",
         tags: ["React", "TypeScript", "Your Tags"],
         delay: 0
       },
       // Add more projects...
     ];
     ```

4. **Update your skills**:
   - Open `client/src/components/SkillsSection.tsx`
   - Update the `skills` array with your own skills and proficiency levels.

5. **Customize social links**:
   - Open `client/src/components/Footer.tsx` and update the social media links.

## Additional Customizations

1. **Change color scheme**:
   - Open `client/src/index.css` to modify the base colors.
   - Or use Tailwind's color classes directly in the components.

2. **Update animations and effects**:
   - Adjust animation timings in `client/src/components/EntranceAnimation.tsx`.
   - Modify AOS (Animate On Scroll) parameters in the various components.

## Contact Form

The contact form is set up to send messages via a backend API. Make sure your server routes are properly configured to handle form submissions.

---

By following this guide, you'll be able to fully customize your portfolio with your personal information, photo, CV, and project details.