const db = require('../models');
const Users = db.users;

const Activities = db.activities;

const Contacts = db.contacts;

const Deals = db.deals;

const EmailCampaigns = db.email_campaigns;

const Leads = db.leads;

const Reports = db.reports;

const Tags = db.tags;

const Tasks = db.tasks;

const ActivitiesData = [
  {
    type: 'Texas!',

    date: new Date('2023-10-02'),

    notes:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'I want my 5$ back',

    date: new Date('2024-06-10'),

    notes: 'The dark side clouds everything. Impossible to see the future is.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'That damn gimble',

    date: new Date('2024-06-13'),

    notes:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: "I'm washing my hands of it",

    date: new Date('2023-07-24'),

    notes: 'That is why you fail.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ContactsData = [
  {
    first_name: 'Turd gone wrong',

    last_name: 'Texas!',

    email: 'dana@kshlerin.com',

    phone: '810-740-0039',

    company: 'Osinski, Adams and Ratke',

    industry: 'Always the last one to the party',

    location: "Goin' hog huntin'",

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'No one tells me shit',

    last_name: "That's messed up",

    email: 'chet@bosco.biz',

    phone: '1-310-195-7642 x5388',

    company: 'Schamberger Group',

    industry: "Y'all never listen to me",

    location: 'That goddamn Datamate',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'That damn Bill Stull',

    last_name: 'My buddy Harlen',

    email: 'ariana@keeling.biz',

    phone: '802-108-9608 x42037',

    company: 'Shields Group',

    industry: 'So I was walking Oscar',

    location: 'So I was walking Oscar',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    first_name: "That Barbala couldn't fly his way out of a wet paper bag",

    last_name: 'My buddy Harlen',

    email: 'elvin.schowalter@williamson-conn.name',

    phone: '298-648-0484 x83319',

    company: 'Fritsch, Macejkovic and Prosacco',

    industry: 'That damn Bill Stull',

    location: "C'mon Naomi",

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const DealsData = [
  {
    name: 'Leonard Euler',

    amount: 34.83,

    stage: 'New',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Willard Libby',

    amount: 90.07,

    stage: 'Won',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'James Watson',

    amount: 39.74,

    stage: 'Qualified',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Paul Ehrlich',

    amount: 38.36,

    stage: 'New',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const EmailCampaignsData = [
  {
    name: 'Dmitri Mendeleev',

    subject: 'Yup',

    content:
      'Always two there are, no more, no less. A master and an apprentice.',

    scheduled_date: new Date('2024-04-14'),

    // type code here for "relation_one" field
  },

  {
    name: 'Ernst Haeckel',

    subject: 'That damn gimble',

    content: 'Luminous beings are we - not this crude matter.',

    scheduled_date: new Date('2023-08-18'),

    // type code here for "relation_one" field
  },

  {
    name: 'George Gaylord Simpson',

    subject: 'Let me tell ya',

    content: 'Do. Or do not. There is no try.',

    scheduled_date: new Date('2024-03-17'),

    // type code here for "relation_one" field
  },

  {
    name: 'Justus Liebig',

    subject: "That's messed up",

    content: 'At an end your rule is, and not short enough it was!',

    scheduled_date: new Date('2024-03-22'),

    // type code here for "relation_one" field
  },
];

const LeadsData = [
  {
    source: 'Yup',

    score: 6,

    status: 'Contacted',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    source: "That Barbala couldn't fly his way out of a wet paper bag",

    score: 8,

    status: 'Lost',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    source: 'My boss gonna fire me',

    score: 2,

    status: 'New',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    source: "How 'bout them Cowboys",

    score: 7,

    status: 'Qualified',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ReportsData = [
  {
    name: 'Emil Kraepelin',

    description: 'Luminous beings are we - not this crude matter.',

    type: 'Standby',

    // type code here for "relation_one" field
  },

  {
    name: 'Paul Dirac',

    description:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    type: 'I want my damn cart back',

    // type code here for "relation_one" field
  },

  {
    name: 'Arthur Eddington',

    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    type: "I'm washing my hands of it",

    // type code here for "relation_one" field
  },

  {
    name: 'Max Delbruck',

    description:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    type: 'Come on now',

    // type code here for "relation_one" field
  },
];

const TagsData = [
  {
    name: 'Dmitri Mendeleev',
  },

  {
    name: 'Frederick Sanger',
  },

  {
    name: 'Francis Galton',
  },

  {
    name: 'Karl Landsteiner',
  },
];

const TasksData = [
  {
    title: "Y'all never listen to me",

    due_date: new Date('2023-12-14'),

    priority: 'Medium',

    // type code here for "relation_one" field
  },

  {
    title: 'Turd gone wrong',

    due_date: new Date('2023-08-13'),

    priority: 'Medium',

    // type code here for "relation_one" field
  },

  {
    title: "Goin' hog huntin'",

    due_date: new Date('2024-01-03'),

    priority: 'Low',

    // type code here for "relation_one" field
  },

  {
    title: "It's around here somewhere",

    due_date: new Date('2023-11-28'),

    priority: 'Low',

    // type code here for "relation_one" field
  },
];

async function associateActivityWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setUser) {
    await Activity0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setUser) {
    await Activity1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setUser) {
    await Activity2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setUser) {
    await Activity3.setUser(relatedUser3);
  }
}

async function associateActivityWithContact() {
  const relatedContact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setContact) {
    await Activity0.setContact(relatedContact0);
  }

  const relatedContact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setContact) {
    await Activity1.setContact(relatedContact1);
  }

  const relatedContact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setContact) {
    await Activity2.setContact(relatedContact2);
  }

  const relatedContact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setContact) {
    await Activity3.setContact(relatedContact3);
  }
}

// Similar logic for "relation_many"

async function associateContactWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setOwner) {
    await Contact0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setOwner) {
    await Contact1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setOwner) {
    await Contact2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact3 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contact3?.setOwner) {
    await Contact3.setOwner(relatedOwner3);
  }
}

async function associateDealWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal0 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Deal0?.setLead) {
    await Deal0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal1 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Deal1?.setLead) {
    await Deal1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal2 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Deal2?.setLead) {
    await Deal2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal3 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Deal3?.setLead) {
    await Deal3.setLead(relatedLead3);
  }
}

async function associateDealWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal0 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Deal0?.setOwner) {
    await Deal0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal1 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Deal1?.setOwner) {
    await Deal1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal2 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Deal2?.setOwner) {
    await Deal2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal3 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Deal3?.setOwner) {
    await Deal3.setOwner(relatedOwner3);
  }
}

async function associateEmailCampaignWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailCampaign0 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EmailCampaign0?.setOwner) {
    await EmailCampaign0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailCampaign1 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EmailCampaign1?.setOwner) {
    await EmailCampaign1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailCampaign2 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EmailCampaign2?.setOwner) {
    await EmailCampaign2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailCampaign3 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (EmailCampaign3?.setOwner) {
    await EmailCampaign3.setOwner(relatedOwner3);
  }
}

async function associateLeadWithContact() {
  const relatedContact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setContact) {
    await Lead0.setContact(relatedContact0);
  }

  const relatedContact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setContact) {
    await Lead1.setContact(relatedContact1);
  }

  const relatedContact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setContact) {
    await Lead2.setContact(relatedContact2);
  }

  const relatedContact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setContact) {
    await Lead3.setContact(relatedContact3);
  }
}

async function associateLeadWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setOwner) {
    await Lead0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setOwner) {
    await Lead1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setOwner) {
    await Lead2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setOwner) {
    await Lead3.setOwner(relatedOwner3);
  }
}

async function associateReportWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setOwner) {
    await Report0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setOwner) {
    await Report1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setOwner) {
    await Report2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report3 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Report3?.setOwner) {
    await Report3.setOwner(relatedOwner3);
  }
}

async function associateTaskWithAssignee() {
  const relatedAssignee0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssignee) {
    await Task0.setAssignee(relatedAssignee0);
  }

  const relatedAssignee1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssignee) {
    await Task1.setAssignee(relatedAssignee1);
  }

  const relatedAssignee2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssignee) {
    await Task2.setAssignee(relatedAssignee2);
  }

  const relatedAssignee3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setAssignee) {
    await Task3.setAssignee(relatedAssignee3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Activities.bulkCreate(ActivitiesData);

    await Contacts.bulkCreate(ContactsData);

    await Deals.bulkCreate(DealsData);

    await EmailCampaigns.bulkCreate(EmailCampaignsData);

    await Leads.bulkCreate(LeadsData);

    await Reports.bulkCreate(ReportsData);

    await Tags.bulkCreate(TagsData);

    await Tasks.bulkCreate(TasksData);

    await Promise.all([
      await associateActivityWithUser(),

      await associateActivityWithContact(),

      // Similar logic for "relation_many"

      await associateContactWithOwner(),

      await associateDealWithLead(),

      await associateDealWithOwner(),

      await associateEmailCampaignWithOwner(),

      await associateLeadWithContact(),

      await associateLeadWithOwner(),

      await associateReportWithOwner(),

      await associateTaskWithAssignee(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('activities', null, {});

    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('deals', null, {});

    await queryInterface.bulkDelete('email_campaigns', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('reports', null, {});

    await queryInterface.bulkDelete('tags', null, {});

    await queryInterface.bulkDelete('tasks', null, {});
  },
};
