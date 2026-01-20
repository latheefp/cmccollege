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
            { date: "02/06/2025", description: "College reopening after summer vacation", type: "milestone" },
            { date: "05/06/2025", description: "World Environment Day celebrations", type: "general" },
            { date: "14/06/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "19/06/2025", description: "Reading Day celebrations", type: "general" },
            { date: "23/06/2025", description: "Commencement of 3rd semester classes", type: "milestone" },
        ]
    },
    {
        month: "July",
        year: "2025",
        events: [
            { date: "01/07/2025", description: "Commencement of 1st semester classes", type: "milestone" },
            { date: "12/07/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "17/07/2025", description: "Muharram (Holiday)", type: "holiday" },
            { date: "21/07/2025", description: "First internal exam (5th semester)", type: "internal" },
        ]
    },
    {
        month: "August",
        year: "2025",
        events: [
            { date: "01/08/2025", endDate: "15/08/2025", description: "First internal exam (3rd & 5th semester)", type: "internal" },
            { date: "06/08/2025", description: "5th semester university exam registration starts", type: "registration" },
            { date: "09/08/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "15/08/2025", description: "Independence Day (Holiday)", type: "holiday" },
            { date: "15/08/2025", description: "Proposal submission (Open-ended modules)", type: "deadline" },
            { date: "16/08/2025", endDate: "30/08/2025", description: "Assignment submission (3rd & 5th semester)", type: "deadline" },
            { date: "18/08/2025", description: "3rd semester university exam registration starts", type: "registration" },
        ]
    },
    {
        month: "September",
        year: "2025",
        events: [
            { date: "04/09/2025", description: "Onam celebration", type: "general" },
            { date: "05/09/2025", description: "College closes for Onam vacation", type: "milestone" },
            { date: "05/09/2025", description: "Teacher's Day", type: "general" },
            { date: "13/09/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "15/09/2025", description: "College reopens after Onam vacation", type: "milestone" },
            { date: "20/09/2025", description: "Nabi Dinam (Holiday)", type: "holiday" },
            { date: "22/09/2025", endDate: "29/09/2025", description: "Second internal exam (3rd & 5th semester)", type: "internal" },
            { date: "24/09/2025", description: "APC submission (5th semester)", type: "deadline" },
            { date: "25/09/2025", description: "Internal mark uploading (5th semester)", type: "deadline" },
            { date: "29/09/2025", description: "APC submission (3rd semester)", type: "deadline" },
            { date: "30/09/2025", description: "Internal mark uploading (3rd semester)", type: "deadline" },
        ]
    },
    {
        month: "October",
        year: "2025",
        events: [
            { date: "01/10/2025", description: "Mahanavami (Holiday)", type: "holiday" },
            { date: "02/10/2025", description: "Gandhi Jayanti (Holiday)", type: "holiday" },
            { date: "06/10/2025", description: "Commencement of 5th semester regular university exam", type: "university" },
            { date: "09/10/2025", description: "First internal exam (1st semester)", type: "internal" },
            { date: "11/10/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "20/10/2025", description: "Deepavali (Holiday)", type: "holiday" },
            { date: "23/10/2025", description: "Commencement of 3rd semester regular university exam", type: "university" },
            { date: "27/10/2025", description: "Commencement of 6th semester classes", type: "milestone" },
        ]
    },
    {
        month: "November",
        year: "2025",
        events: [
            { date: "01/11/2025", description: "Kerala Piravi", type: "general" },
            { date: "03/11/2025", description: "Commencement of 4th semester classes", type: "milestone" },
            { date: "08/11/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "10/11/2025", description: "1st semester university exam registration starts", type: "registration" },
            { date: "14/11/2025", description: "Children's Day", type: "general" },
            { date: "24/11/2025", endDate: "28/11/2025", description: "Assignment submission (1st semester)", type: "deadline" },
        ]
    },
    {
        month: "December",
        year: "2025",
        events: [
            { date: "01/12/2025", description: "World AIDS Day", type: "general" },
            { date: "08/12/2025", endDate: "12/12/2025", description: "Second internal exam (1st semester)", type: "internal" },
            { date: "13/12/2025", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "15/12/2025", description: "APC submission (1st semester)", type: "deadline" },
            { date: "16/12/2025", description: "Internal mark uploading (1st semester)", type: "deadline" },
            { date: "19/12/2025", description: "College closes for Christmas vacation", type: "milestone" },
            { date: "29/12/2025", description: "College reopens after Christmas vacation", type: "milestone" },
        ]
    },
    {
        month: "January",
        year: "2026",
        events: [
            { date: "05/01/2026", description: "Commencement of 1st semester regular university exam", type: "university" },
            { date: "10/01/2026", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "12/01/2026", endDate: "16/01/2026", description: "First internal exam (6th semester)", type: "internal" },
            { date: "19/01/2026", endDate: "23/01/2026", description: "First internal exam (4th semester)", type: "internal" },
            { date: "26/01/2026", description: "Republic Day (Holiday)", type: "holiday" },
            { date: "28/01/2026", description: "Commencement of 2nd semester classes", type: "milestone" },
        ]
    },
    {
        month: "February",
        year: "2026",
        events: [
            { date: "02/02/2026", description: "6th semester university exam registration starts", type: "registration" },
            { date: "09/02/2026", description: "4th semester university exam registration starts", type: "registration" },
            { date: "14/02/2026", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "16/02/2026", endDate: "20/02/2026", description: "Assignment submission (6th & 4th semester)", type: "deadline" },
            { date: "23/02/2026", endDate: "27/02/2026", description: "Second internal exam (6th semester)", type: "internal" },
        ]
    },
    {
        month: "March",
        year: "2026",
        events: [
            { date: "02/03/2026", endDate: "06/03/2026", description: "Second internal exam (4th semester)", type: "internal" },
            { date: "02/03/2026", description: "APC submission (6th semester)", type: "deadline" },
            { date: "03/03/2026", description: "Internal mark uploading (6th semester)", type: "deadline" },
            { date: "08/03/2026", description: "International Women's Day", type: "general" },
            { date: "09/03/2026", description: "APC submission (4th semester)", type: "deadline" },
            { date: "10/03/2026", description: "Internal mark uploading (4th semester)", type: "deadline" },
            { date: "14/03/2026", description: "Second Saturday (Holiday)", type: "holiday" },
            { date: "16/03/2026", description: "Model exam (6th semester)", type: "internal" },
            { date: "23/03/2026", description: "Commencement of 6th semester regular university exam", type: "university" },
            { date: "31/03/2026", description: "College closes for Summer Vacation (End of Academic Year)", type: "milestone" },
        ]
    }
];
