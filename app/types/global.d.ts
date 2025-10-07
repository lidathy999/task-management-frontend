
  interface Todo {
    id: number;
    title: string;
    description: string;
    taskTypeId: number;
    taskStatusId: number;
    createdAt: string;
    updatedAt: string;
  };

  interface TaskType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string | null;
  };


  interface Priority {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string | null;
  }

  interface TaskStatus {
    id: number;
    name: string;
  }

  interface UserTasks {
    products: any[];
    tasks: Todo[][];
    priorities: Priority[];
    taskTypes: TaskType[];
  }