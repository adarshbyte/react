const data = [
  {
    name: 'California',
    key: 'CA',
    districts: [
      {
        name: 'Los Angeles County',
        key: 'LA',
        cities: [
          { name: 'Los Angeles', key: 'LA_CITY' },
          { name: 'Beverly Hills', key: 'BH' },
          { name: 'Santa Monica', key: 'SM' },
        ],
      },
      {
        name: 'San Francisco County',
        key: 'SF',
        cities: [
          { name: 'San Francisco', key: 'SF_CITY' },
          { name: 'Daly City', key: 'DC' },
        ],
      },
      {
        name: 'Orange County',
        key: 'OC',
        cities: [], // Empty cities array
      },
    ],
  },
  {
    name: 'Texas',
    key: 'TX',
    districts: [
      {
        name: 'Harris County',
        key: 'HC',
        cities: [
          { name: 'Houston', key: 'HOU' },
          { name: 'Pasadena', key: 'PAS' },
        ],
      },
      {
        name: 'Dallas County',
        key: 'DAL',
        cities: [
          { name: 'Dallas', key: 'DAL_CITY' },
          { name: 'Irving', key: 'IRV' },
        ],
      },
    ],
  },
  {
    name: 'New York',
    key: 'NY',
    districts: [
      {
        name: 'New York County',
        key: 'NYC',
        cities: [
          { name: 'Manhattan', key: 'MAN' },
          { name: 'Bronx', key: 'BRX' },
        ],
      },
    ],
  },
  {
    name: 'Nevada',
    key: 'NV',
    districts: [], 
  },
];
export default data;
