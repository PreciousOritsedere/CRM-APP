<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useContactsStore } from "@/stores/Contacts/contacts";
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

const contactsStore = useContactsStore()
const router = useRouter();

const notification = computed(() => contactsStore.notify)
const titleStack = ref(['Admin', 'Contacts'])

        const optionsTags = computed(() => contactsStore.searchResultTags);

        const optionsOwner = computed(() => contactsStore.searchResultOwner);

const form = reactive({

      first_name: '',

      last_name: '',

      email: '',

      phone: '',

      company: '',

      industry: '',

      location: '',

      tags: [],

      owner: '',

})

onBeforeMount(async () => {

  await searchTags();

  await searchOwner();

})

const submit = async () => {
  try {

            form.tags = form.tags.map(item => item.id);

            form.owner = form.owner.id;

    await contactsStore.newItem({ ...form })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.first_name = '';

        form.last_name = '';

        form.email = '';

        form.phone = '';

        form.company = '';

        form.industry = '';

        form.location = '';

        form.tags = [];

        form.owner = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchTags(val) {
      await contactsStore.searchTags(val);
    }

    async function searchOwner(val) {
      await contactsStore.searchOwner(val);
    }

watch(() => contactsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Contacts notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    contactsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Contacts"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="FirstName"
    >
      <FormControl
        v-model="form.first_name"
        placeholder="Your FirstName"
      />
    </FormField>

    <FormField
      label="LastName"
    >
      <FormControl
        v-model="form.last_name"
        placeholder="Your LastName"
      />
    </FormField>

    <FormField
      label="Email"
    >
      <FormControl
        v-model="form.email"
        placeholder="Your Email"
      />
    </FormField>

    <FormField
      label="Phone"
    >
      <FormControl
        v-model="form.phone"
        placeholder="Your Phone"
      />
    </FormField>

    <FormField
      label="Company"
    >
      <FormControl
        v-model="form.company"
        placeholder="Your Company"
      />
    </FormField>

    <FormField
      label="Industry"
    >
      <FormControl
        v-model="form.industry"
        placeholder="Your Industry"
      />
    </FormField>

    <FormField
      label="Location"
    >
      <FormControl
        v-model="form.location"
        placeholder="Your Location"
      />
    </FormField>

    <FormField
        label="Tags"
      >
        <v-select
          v-model="form.tags"
          :options="optionsTags"
          multiple
          @input="searchTags($event.target.value)"
        />
    </FormField>

  <FormField
      label="Owner"
    >
        <v-select
          v-model="form.owner"
          :options="optionsOwner"
          @input="searchOwner($event.target.value)"
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
