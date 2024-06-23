<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const contactsStore = useContactsStore()

const titleStack = ref(['Admin', 'Contacts'])
const notification = computed(() => contactsStore.notify)

        const optionsTags = computed(() => contactsStore.searchResultTags);

        const optionsOwner = computed(() => contactsStore.searchResultOwner);

const contactsItem = computed(() => contactsStore.data);

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

const submit = async () => {
  try {

            form.tags = form.tags.map(item => item.id);

            form.owner = form.owner?.id;

    await contactsStore.edit({id: route.params.id, data: {...form} })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchTags();

  await searchOwner();

    await contactsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    contactsStore.showNotification(e, 'error');
  }
})

    async function searchTags(val) {
      await contactsStore.searchTags(val);
    }

    async function searchOwner(val) {
      await contactsStore.searchOwner(val);
    }

const formatData = () => {

    form.first_name = contactsItem.value.first_name

    form.last_name = contactsItem.value.last_name

    form.email = contactsItem.value.email

    form.phone = contactsItem.value.phone

    form.company = contactsItem.value.company

    form.industry = contactsItem.value.industry

    form.location = contactsItem.value.location

    form.tags = dataFormatter.tagsManyListFormatterEdit(contactsItem.value.tags)

    form.owner = dataFormatter.usersOneListFormatterEdit(contactsItem.value.owner)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/contacts')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Contacts"
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
