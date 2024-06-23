<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const tasksStore = useTasksStore()

const titleStack = ref(['Admin', 'Tasks'])
const notification = computed(() => tasksStore.notify)

      const optionsPriority = [{id: 0, label: 'Low'},{id: 1, label: 'Medium'},{id: 2, label: 'High'},]

        const optionsAssignee = computed(() => tasksStore.searchResultAssignee);

const tasksItem = computed(() => tasksStore.data);

const form = reactive({

    title: '',

      due_date: '',

      priority: '',

      assignee: '',

})

const submit = async () => {
  try {

            form.priority = form.priority.label;

            form.assignee = form.assignee?.id;

    await tasksStore.edit({id: route.params.id, data: {...form} })
    router.push('/tasks');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchAssignee();

    await tasksStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    tasksStore.showNotification(e, 'error');
  }
})

    async function searchAssignee(val) {
      await tasksStore.searchAssignee(val);
    }

const formatData = () => {

    form.title = tasksItem.value.title

    form.due_date = dataFormatter.dateTimeFormatter(tasksItem.value.due_date)

    form.priority = optionsPriority.find(el => el.label === tasksItem.value.priority)

    form.assignee = dataFormatter.usersOneListFormatterEdit(tasksItem.value.assignee)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/tasks')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Tasks</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Tasks"
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
        :options="optionsPriority"
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
        type="button"
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
