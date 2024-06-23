<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from "@/stores/Tasks/tasks";
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const tasksStore = useTasksStore()
const router = useRouter();

const notification = computed(() => tasksStore.notify)
const titleStack = ref(['Admin', 'Tasks'])

        const optionsAssignee = computed(() => tasksStore.searchResultAssignee);

const form = reactive({

      title: '',

      due_date: '',

      priority: false,

      assignee: '',

})

onBeforeMount(async () => {

  await searchAssignee();

})

const submit = async () => {
  try {

            form.priority = form.priority.label;

            form.assignee = form.assignee.id;

    await tasksStore.newItem({ ...form })
    router.push('/tasks');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.title = '';

        form.due_date = '';

        form.priority = false;

        form.assignee = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchAssignee(val) {
      await tasksStore.searchAssignee(val);
    }

watch(() => tasksStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Tasks notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    tasksStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Tasks</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Tasks"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Title"
    >
      <FormControl
        v-model="form.title"
        placeholder="Your Title"
      />
    </FormField>

    <FormField
      label="DueDate"
    >
      <FormControl
        type="datetime-local"
        v-model="form.due_date"
        placeholder="Your DueDate"
      />
    </FormField>

    <FormField label="Priority">
      <FormControl
        v-model="form.priority"
        :options="[{id: 0, label: 'Low'},
                    {id: 1, label: 'Medium'},
                    {id: 2, label: 'High'},
                    ]"
      />
    </FormField>

  <FormField
      label="Assignee"
    >
        <v-select
          v-model="form.assignee"
          :options="optionsAssignee"
          @input="searchAssignee($event.target.value)"
        />
  </FormField>

    <BaseDivider />

    <BaseButtons>
      <BaseButton
        type="submit"
        color="info"
        label="Submit"
      />
      <BaseButton
        type="reset"
        color="info"
        outline
        label="Reset"
        @click="reset"
      />
      <BaseButton
        type="cancel"
        color="danger"
        outline
        label="Cancel"
        @click="cancel"
      />
    </BaseButtons>
  </CardBox>
</SectionMain>

</template>
