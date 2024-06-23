<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios';
import {
  mdiInformation,
} from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

const titleStack = ref(['Admin', 'Dashboard'])

const counts = reactive({
  users: 0,activities: 0,contacts: 0,deals: 0,email_campaigns: 0,leads: 0,reports: 0,tags: 0,tasks: 0,
})

onMounted(() => {
  const fetchData = async () => {
    const { data: { count: users } } = await axios.get('/users/count');
    const { data: { count: activities } } = await axios.get('/activities/count');
    const { data: { count: contacts } } = await axios.get('/contacts/count');
    const { data: { count: deals } } = await axios.get('/deals/count');
    const { data: { count: email_campaigns } } = await axios.get('/email_campaigns/count');
    const { data: { count: leads } } = await axios.get('/leads/count');
    const { data: { count: reports } } = await axios.get('/reports/count');
    const { data: { count: tags } } = await axios.get('/tags/count');
    const { data: { count: tasks } } = await axios.get('/tasks/count');

    counts.users = users;
    counts.activities = activities;
    counts.contacts = contacts;
    counts.deals = deals;
    counts.email_campaigns = email_campaigns;
    counts.leads = leads;
    counts.reports = reports;
    counts.tags = tags;
    counts.tasks = tasks;

  };
  fetchData();
})

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Dashboard</SectionHeroBar>
  <SectionMain>
    <p class="text-2xl text-pavitra-900">
      Welcome, Admin
    </p>
  </SectionMain>
  <SectionMain class="flex flex-wrap">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6 w-full">

      <a href="#/users">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.users"
        label="Users"
          /></a><a href="#/activities">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.activities"
        label="Activities"
          /></a><a href="#/contacts">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.contacts"
        label="Contacts"
          /></a><a href="#/deals">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.deals"
        label="Deals"
          /></a><a href="#/email_campaigns">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.email_campaigns"
        label="Email_campaigns"
          /></a><a href="#/leads">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.leads"
        label="Leads"
          /></a><a href="#/reports">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.reports"
        label="Reports"
          /></a><a href="#/tags">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.tags"
        label="Tags"
          /></a><a href="#/tasks">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.tasks"
        label="Tasks"
          /></a>

    </div>
  </SectionMain>
</template>
