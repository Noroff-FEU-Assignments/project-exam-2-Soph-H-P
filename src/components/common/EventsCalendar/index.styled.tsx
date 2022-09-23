import styled from 'styled-components';
import theme from '../../../styles/theme';

export const CalendarContainer = styled.div`
  width: 100%;
  padding: 10px;

  .events {
    margin: 0;
    padding: 0px;
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

  .ant-picker-cell-inner.ant-picker-calendar-date {
    border-radius: 10px;
    margin: 12px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-today.ant-picker-cell-selected
    > .ant-picker-cell-inner.ant-picker-calendar-date.ant-picker-calendar-date-today {
    background: ${theme.colors.primaryColor};
  }

  .ant-picker-cell-inner.ant-picker-calendar-date.ant-picker-calendar-date-today {
    background: ${theme.colors.primaryColor};

    .ant-picker-calendar-date-value,
    .ant-badge-status-text,
    .ant-badge-status {
      color: ${theme.colors.brightWhite};
      background: none;
    }
  }

  .ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-selected
    > .ant-picker-cell-inner.ant-picker-calendar-date {
    background: ${theme.colors.primaryHighlightColor};
  }
`;
