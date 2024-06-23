<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActivitiesStore } from "@/stores/Activities/activities";
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
const activitiesStore = useActivitiesStore()

const titleStack = ref(['Admin', 'Activities'])
const notification = computed(() => activitiesStore.notify)

        const optionsUser = computed(() => activitiesStore.searchResultUser);

        const optionsContact = computed(() => activitiesStore.searchResultContact);

const activitiesItem = computed(() => activitiesStore.data);

const form = reactive({

    type: '',

      date: '',

    notes: [''],

      user: '',

      contact: '',

})

const submit = async () => {
  try {

            form.user = form.user?.id;

            form.contact = form.contact?.id;

    await activitiesStore.edit({id: route.params.id, data: {...form} })
    router.push('/activities');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchUser();

  await searchContact();

    await activitiesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    activitiesStore.showNotification(e, 'error');
  }
})

    async function searchUser(val) {
      await activitiesStore.searchUser(val);
    }

    async function searchContact(val) {
      await activitiesStore.searchContact(val);
    }

const formatData = () => {

    form.type = activitiesItem.value.type

    form.date = dataFormatter.dateTimeFormatter(activitiesItem.value.date)

    form.notes = activitiesItem.value.notes

    form.user = dataFormatter.usersOneListFormatterEdit(activitiesItem.value.user)

    form.contact = dataFormatter.contactsOneListFormatterEdit(activitiesItem.value.contact)

}

watch(() => activitiesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Activities notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    activitiesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/activities')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Activities</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Activities"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Type"
    >
      <FormControl
        v-model="form.type"
        placeholder="Your Type"
        />
    </FormField>

    <FormField
      label="Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.date"
        placeholder="Your Date"
      />
    </FormField>

    <label class="block font-bold mb-2 text-pavitra-700 text-sm">Notes</label>
    <Editor
      api-key="s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4"
      cloudChannel="6"
      v-model="form.notes"
      />

  <FormField
      label="User"
    >
      <v-select
        v-model="form.user"
        :options="optionsUser"
        @input="searchUser($event.target.value)"
      />
  </FormField>

  <FormField
      label="Contact"
    >
      <v-select
        v-model="form.contact"
        :options="optionsContact"
        @input="searchContact($event.target.value)"
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
