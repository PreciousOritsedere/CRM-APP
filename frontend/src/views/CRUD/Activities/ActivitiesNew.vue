<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const activitiesStore = useActivitiesStore()
const router = useRouter();

const notification = computed(() => activitiesStore.notify)
const titleStack = ref(['Admin', 'Activities'])

        const optionsUser = computed(() => activitiesStore.searchResultUser);

        const optionsContact = computed(() => activitiesStore.searchResultContact);

const form = reactive({

      type: '',

      date: '',

    notes: '',

      user: '',

      contact: '',

})

onBeforeMount(async () => {

  await searchUser();

  await searchContact();

})

const submit = async () => {
  try {

            form.user = form.user.id;

            form.contact = form.contact.id;

    await activitiesStore.newItem({ ...form })
    router.push('/activities');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.type = '';

        form.date = '';

      form.notes = '';

        form.user = '';

        form.contact = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchUser(val) {
      await activitiesStore.searchUser(val);
    }

    async function searchContact(val) {
      await activitiesStore.searchContact(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Activities</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Activities"
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
