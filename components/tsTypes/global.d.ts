export {};

declare global {
    type DataListType = {
        icon: string;
        id: string;
        name: string;
        user_id: string;
        date_created: string;
        tasks: string[]
    };
   
    type DataDoType = {
        due_date: string;
        name: string;
        description: string;
        task: string;
        id: string;
        list: string;
        sub_tasks: SubTaskType[];
        done: boolean
    };

    type SubTaskType = {
        id: number;
        name: string;
        done: boolean
    };

}