<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useLeadsStore } from "@/stores/Leads/leads";
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

const leadsStore = useLeadsStore()
const router = useRouter();

const notification = computed(() => leadsStore.notify)
const titleStack = ref(['Admin', 'Leads'])

        const optionsContact = computed(() => leadsStore.searchResultContact);

        const optionsOwner = computed(() => leadsStore.searchResultOwner);

const form = reactive({

      source: '',

      score: '',

      status: false,

      contact: '',

      owner: '',

})

onBeforeMount(async () => {

  await searchContact();

  await searchOwner();

})

const submit = async () => {
  try {

            form.status = form.status.label;

            form.contact = form.contact.id;

            form.owner = form.owner.id;

    await leadsStore.newItem({ ...form })
    router.push('/leads');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.source = '';

        form.score = '';

        form.status = false;

        form.contact = '';

        form.owner = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchContact(val) {
      await leadsStore.searchContact(val);
    }

    async function searchOwner(val) {
      await leadsStore.searchOwner(val);
    }

watch(() => leadsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Leads notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    leadsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Leads</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Leads"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Source"
    >
      <FormControl
        v-model="form.source"
        placeholder="Your Source"
      />
    </FormField>

    <FormField
      label="Score"
    >
      <FormControl
        type="number"
        v-model="form.score"
        placeholder="Your Score"
      />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="[{id: 0, label: 'New'},
                    {id: 1, label: 'Contacted'},
                    {id: 2, label: 'Qualified'},
                    {id: 3, label: 'Lost'},
                    ]"
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
