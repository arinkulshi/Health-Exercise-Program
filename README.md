### Exercise Health Platform

This repository contains the high-level design for an Exercise Health Platform. The platform aims to facilitate the creation, sharing, and tracking of exercise programs between healthcare providers and patients.

#### User Roles

- **Provider**: Can create, modify, and assign exercise programs to patients.
- **Patient**: Can view and perform exercises prescribed in the program.

#### Key Features

1. **Exercise Library**: A repository of exercises that providers can choose from to create exercise programs.
2. **Program Creation**: Providers can create personalized exercise programs for patients.
3. **Program Sharing**: Providers can share exercise programs with their patients.
4. **Progress Tracking**: Patients can track and update their progress within the platform.
5. **Notifications**: Automated reminders for patients to perform exercises and notifications for providers about patient progress.

#### Data Storage

- **Provider Data**: Stores professional information of healthcare providers.
- **Patient Data**: Contains personal information and exercise progress of patients.
- **Exercise Data**: Includes details about each exercise available in the platform's library.
- **Program Data**: Stores information about exercise programs, including a list of exercises, instructions, and assigned patients.

Explanation:
- **Provider and Program**: Each provider can assign multiple programs, but each program is assigned by only one provider.
- **Patient and Program**: A patient can be assigned multiple programs, but each program is assigned to one patient.
- **Program and Exercise**: A program can contain multiple exercises, and each exercise can be part of multiple programs.
- **Patient and Exercise**: Patients perform multiple exercises, and each exercise can be performed by multiple patients. (double join)







