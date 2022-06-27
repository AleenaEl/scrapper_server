/* eslint-disable require-jsdoc */

export {
  getActions,
};

async function getActions(req, res) {
  res.status(200).send({
    'actions': actions,
  });
}

const actions = [
  {
    'title': 'Out Pass',
    'iconImamge': '',
    'action_id': 0,
    'description': '',
  },
  {
    'title': 'Home pass',
    'iconImamge': '',
    'action_id': 1,
    'description': '',
  },
  {
    'title': 'Fees Payment',
    'iconImamge': '',
    'action_id': 2,
    'description': '',
  },
  {
    'title': 'Complaints',
    'iconImamge': '',
    'action_id': 3,
    'description': '',
  },
];
