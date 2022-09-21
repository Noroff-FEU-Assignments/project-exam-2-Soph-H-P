import styled from 'styled-components';

export const CalendarContainer = styled.div`
  .events {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .events .ant-badge-status {
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .notes-month {
    font-size: 28px;
    text-align: center;
  }
  .notes-month section {
    font-size: 28px;
  }

  .ant-radio-group.ant-radio-group-outline.ant-picker-calendar-mode-switch {
    display: none;
  }
`;
