export type EventType = "university" | "internal" | "registration" | "deadline" | "general" | "holiday" | "milestone";

export interface CalendarEvent {
    date: string;
    description: string;
    type?: EventType;
    endDate?: string; // For date ranges
}

export interface MonthData {
    month: string;
    year: string;
    events: CalendarEvent[];
}

export const calendarData: MonthData[] = [
    {
        month: "June",
        year: "2025",
        events: [
            { date: "02/06/2025", description: "College Reopening after summer vacation, Commencement of 3rd semester", type: "milestone" },
            { date: "23/06/2025", description: "Commencement of 3rd semester", type: "milestone" },
        ]
    },
    {
        month: "July",
        year: "2025",
        events: [
            { date: "01/07/2025", description: "Commencement of 1st semester", type: "milestone" },
        ]
    },
    {
        month: "August",
        year: "2025",
        events: [
            { date: "01/08/2025", endDate: "15/08/2025", description: "First internal examination 3rd & 5th semester", type: "internal" },
            { date: "06/08/2025", description: "5th semester University Examination Registration", type: "registration" },
            { date: "15/08/2025", description: "Proposal submission - open-ended modules", type: "deadline" },
            { date: "16/08/2025", endDate: "30/08/2025", description: "Assignment submission, 3rd and 5th semester", type: "deadline" },
            { date: "18/08/2025", description: "3rd semester University Examination Registration", type: "registration" },
        ]
    },
    {
        month: "September",
        year: "2025",
        events: [
            { date: "01/09/2025", endDate: "15/09/2025", description: "Assignment submission, 1st semester", type: "deadline" },
            { date: "01/09/2025", endDate: "15/09/2025", description: "First internal examination 1st semester", type: "internal" },
            { date: "10/09/2025", description: "1st semester University Examination registration", type: "registration" },
            { date: "22/09/2025", endDate: "30/09/2025", description: "Model Examination of 3rd and 5th semesters", type: "internal" },
            { date: "30/09/2025", description: "Completion of open-ended modules (3rd, 1st)", type: "deadline" },
        ]
    },
    {
        month: "October",
        year: "2025",
        events: [
            { date: "08/10/2025", description: "Last date of 3rd semester APC", type: "deadline" },
            { date: "08/10/2025", description: "Uploading internal mark (3rd and 5th) at college portal", type: "deadline" },
            { date: "08/10/2025", description: "End of semester 3", type: "milestone" },
            { date: "09/10/2025", description: "Starting 4th semester", type: "milestone" },
            { date: "13/10/2025", description: "Last date of 1st semester APC", type: "deadline" },
            { date: "20/10/2025", endDate: "30/10/2025", description: "Model Exam - 1st Semester", type: "internal" },
            { date: "20/10/2025", endDate: "30/10/2025", description: "Uploading internal mark (1st sem) at college portal", type: "deadline" },
            { date: "21/10/2025", description: "Last date of 5th semester APC", type: "deadline" },
            { date: "25/10/2025", description: "Last date of uploading internal marks of 3rd semester University portal", type: "deadline" },
            { date: "30/10/2025", description: "Commencement of 5th semester University Examination", type: "university" },
            { date: "31/10/2025", description: "End of semester 1", type: "milestone" },
        ]
    },
    {
        month: "November",
        year: "2025",
        events: [
            { date: "03/11/2025", description: "Commencement of 1st semester University Examinations", type: "university" },
            { date: "03/11/2025", description: "Commencement of 3rd semester University Examinations as per university Calendar", type: "university" },
            { date: "06/11/2025", description: "Last date of uploading internal marks of first semester at university portal", type: "deadline" },
            { date: "11/11/2025", description: "Last date of uploading internal marks of 5th semester at university portal", type: "deadline" },
            { date: "11/11/2025", description: "End of semester 5", type: "milestone" },
            { date: "12/11/2025", description: "Starting 6th semester", type: "milestone" },
            { date: "20/11/2025", endDate: "30/11/2025", description: "1st internal Examination 4th sem", type: "internal" },
            { date: "27/11/2025", description: "Starting 2nd semester", type: "milestone" },
        ]
    },
    {
        month: "December",
        year: "2025",
        events: [
            { date: "01/12/2025", description: "4th semester University Examination registration", type: "registration" },
            { date: "12/12/2025", description: "Publication of 5th semester results", type: "milestone" },
            { date: "12/12/2025", description: "Proposal submission - open-ended modules (2nd, 4th)", type: "deadline" },
            { date: "15/12/2025", description: "Publication of 1st semester results", type: "milestone" },
            { date: "15/12/2025", description: "Publication of 3rd semester results", type: "milestone" },
            { date: "30/12/2025", description: "6th semester University Examination registration", type: "registration" },
        ]
    },
    {
        month: "January",
        year: "2026",
        events: [
            { date: "05/01/2026", description: "2nd semester University Examination registration", type: "registration" },
            { date: "10/01/2026", endDate: "15/01/2026", description: "1st internal Examination (6th sem, 1st sem)", type: "internal" },
        ]
    },
    {
        month: "February",
        year: "2026",
        events: [
            { date: "09/02/2026", description: "Project final submission", type: "deadline" },
            { date: "09/02/2026", description: "Lab Record Submission", type: "deadline" },
            { date: "10/02/2026", description: "Assignment submission 2nd, 4th, 6th semester", type: "deadline" },
            { date: "15/02/2026", endDate: "25/02/2026", description: "Completion of open-ended modules (4th, 2nd)", type: "deadline" },
            { date: "15/02/2026", endDate: "25/02/2026", description: "Model Exam, 6th semester", type: "internal" },
            { date: "15/02/2026", endDate: "25/02/2026", description: "Date of uploading internal marks of 6th semester at college portal", type: "deadline" },
        ]
    },
    {
        month: "March",
        year: "2026",
        events: [
            { date: "05/03/2026", endDate: "20/03/2026", description: "Model Exam 4th, 2nd semester", type: "internal" },
            { date: "05/03/2026", endDate: "20/03/2026", description: "Date of uploading internal marks of 4th semester at college portal", type: "deadline" },
            { date: "30/03/2026", description: "End of semester 6", type: "milestone" },
            { date: "30/03/2026", description: "Last date of uploading internal marks of 6th & 2nd semester at university portal", type: "deadline" },
            { date: "31/03/2026", description: "End of semester 4 & 3", type: "milestone" },
            { date: "31/03/2026", description: "Last date of uploading internal marks of 4th semester at university portal", type: "deadline" },
        ]
    },
    {
        month: "April",
        year: "2026",
        events: [
            { date: "06/04/2026", description: "Commencement of 3rd semester University Examinations as per university Calendar", type: "university" },
        ]
    }
];
