# hep
Health Exercise Program

High-Level Design
User Roles:
Provider: Can create, modify, and assign exercise programs to patients.
Patient: Can view and perform exercises prescribed in the program.
Key Features:
Exercise Library: A repository of exercises that providers can choose from to create a program.
Program Creation: Providers can create a custom exercise program for patients.
Program Sharing: Providers can share the program with patients securely.
Progress Tracking: Patients can track and update their progress, which can be viewed by the provider.
Notifications: Reminders for patients to perform exercises and notifications for providers about patient progress.
Data Storage:
Provider Data: Includes personal and professional information.
Patient Data: Includes personal information and exercise progress.
Exercise Data: Includes details about each exercise in the library.
Program Data: Includes a list of exercises, instructions, and assigned patients.

Tables Created: 
Provider: ProviderID, Name, Specialization, etc.
Patient: PatientID, Name, InjuryType, etc.
Exercise: ExerciseID, Name, Description, VideoURL, etc.
Program: ProgramID, AssignedPatient, AssignedProvider, ExerciseList




