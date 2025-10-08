<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }" class="">
      <div class="flex px-6 items-center pt-5">
        <h3 class="mr-4">Board</h3>
        <v-btn
          v-bind="activatorProps"
          color="primary"
          text=" Create task"
          variant="flat"
        ></v-btn>
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card title="Dialog" class="pa-4">
          <v-select
            v-model="selectedTaskType"
            :items="userTasks.taskTypes"
            :item-props="itemProps"
            :rules="[(v: any) => !!v || 'Issue Type is required']"
            item-text="name"
            item-value="id"
            label="Issue Type*"
            class="mb-4"
            required
          >
          </v-select>

          <v-text-field
            v-model="title"
            :rules="[(v: any) => !!v || 'Title is required']"
            label="Title*"
            required
            class="mb-4"
          >
          </v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            class="mb-4"
          ></v-textarea>

          <v-select
            v-model="selectedPriority"
            :items="userTasks.priorities"
            :item-props="itemProps"
            :rules="[(v: any) => !!v || 'Priority is required']"
            item-text="name"
            item-value="id"
            label="Priority*"
            class="mb-4"
            single-line
            required
          >
          </v-select>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="onClose(isActive)"></v-btn>
            <v-btn text="Save" @click="saveTask(isActive)"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </template>
  </v-dialog>

  <div
    class="min-w-[1100px] overflow-y-scroll grid grid-cols-4 gap-4 w-full !mt-6 !p-4"
  >
    <div
      v-for="(item, index) in taskStatuses"
      :key="item.id"
      class="mb-2 rounded-md shadow-md"
    >
      <h2 class="!p-4 mb-4 text-center font-semibold bg-gray-200 rounded-t-md">
        {{ item.name }}
      </h2>
      <div class="!px-4">
        <div
          v-if="groupedTasks[index] && groupedTasks[index].length > 0"
          v-for="task in groupedTasks[index]"
          :key="task.id"
          class="bg-gray-100 !p-2 rounded-md mb-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <p>{{ task.title }}</p>
              <p class="text-gray-500 text-sm">{{ task.description }}</p>
            </div>
            <div v-if="index === 0">
              <v-icon :icon="mdiSquareEditOutline" color="primary" />
              <v-icon :icon="mdiDelete" color="error" />
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-4">
          No tasks available
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { mdiSquareEditOutline, mdiDelete } from "@mdi/js";

import { useTodoStore } from "~/store/todoStore";
import { PRIORITY, TASK_STATUS, TASK_TYPE } from "~/constants/mockData";

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);

const taskStatuses = ref<any[]>(TASK_STATUS);

const valid = ref(true);
const form = ref<any>(null);

const title = ref("");
const description = ref("");
const selectedTaskType = ref<number>(0);
const selectedPriority = ref<number>(0);
const priorities = ref<any[]>([]);

const userTasks = reactive<any>({ // Changed type to any for simplicity here
  products: [],
  tasks: [],
  priorities: PRIORITY,
  taskTypes: TASK_TYPE,
});

const groupedTasks = computed(() => {
  if (todos.value.length === 0) {
    return [[], [], [], []];
  }

  let newTodos: any[] = [[], [], [], []];
  todos.value.forEach((todo) => {
    const statusIndex = todo.taskStatusId - 1;
    if (statusIndex >= 0 && statusIndex < newTodos.length) {
      newTodos[statusIndex].push(todo);
    }
  });

  return newTodos;
});

Object.assign(userTasks, { tasks: groupedTasks.value });

const newPriorities =
  PRIORITY.map((priority) => {
    return {
      name: priority.name,
      value: priority.id,
    };
  }) || [];

priorities.value = newPriorities;

const itemProps = (item: any) => {
  return {
    title: item.name,
    value: item.id,
  };
};

const validate = async(): Promise<boolean> => {
    if (!form.value) return false;
    const { valid: isValid } = await form.value.validate();
    return isValid;
};

const onClose = (isActive: any) => {
  isActive.value = false;
  title.value = "";
  description.value = "";
  selectedTaskType.value = 0;
  selectedPriority.value = 0;
};

const saveTask = async (isActive: any) => {
  const isValid = await validate();
  
  if (!isValid) {
    console.error("Form validation failed. Task not created.");
    return;
  }

  todoStore.addTodo({
    id: Math.floor(Math.random() * 100000),
    title: title.value,
    description: description.value,
    taskTypeId: selectedTaskType.value,
    taskStatusId: 1, 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  
  title.value = "";
  description.value = "";
  selectedTaskType.value = 0;
  selectedPriority.value = 0;
  
  isActive.value = false;
};
</script>

<style>
.divider {
  margin: 0px;
}

#app {
  padding: 0px;
  max-width: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: column;
}

.el-overlay-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dialog {
  margin: 0px;
  margin-left: 240px;
}
</style>
<style scoped>
.icon {
  font-size: 25px;
  width: 20px;
  height: 30px;
}

.wrap-head-title {
  display: flex;
  align-items: center;
}

.common-layout {
  background-color: royalblue;
  background-color: rgb(255, 255, 255);
  display: flex;
  height: 100vh;
}

.container {
  height: 100%;
}

.aside {
  background-color: var(--ds-menu-seperator-color, var(--ds-border, #ebecf0));
  color: rgb(0, 0, 0);
  box-shadow: 2px 0px 5px -2px #dbdbdb;
  /* width: 240px; */
}

.header {
  background-color: #fff;
  box-shadow: 4px 2px 18px 1px #dbdbdb;
  color: rgb(0, 0, 0);
  display: flex;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
