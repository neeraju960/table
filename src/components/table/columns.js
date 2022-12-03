import moment from "moment";

export const col = [
  {
    Header: "Log ID",
    accessor: "logId",
  },
  {
    Header: "Application Type",
    accessor: "applicationType",
  },
  {
    Header: "Application ID",
    accessor: "applicationId",
  },
  {
    Header: "Action",
    accessor: "actionType",
  },
  {
    Header: "Action Details",
    accessor: "actionDetails",
  },
  {
    Header: "Date:Time",
    accessor: "creationTimestamp",
    Cell: ({ value }) => moment(value).format('DD-MM-YYYY hh:mm:ss'),
  },
];
