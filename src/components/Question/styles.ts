import styled from "styled-components";

export const Container = styled.div`
  background: ${props => props.theme.colors.input};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 2px;

  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background: #f4f0ff;
    border: 1px solid #835afd;
    p {
      color: #29292e;
    }

    footer .user-info span {
      color: #29292e;
    }
  }

  &.answered {
    background: #dbdcd0;
    p {
      color: #29292e;
    }
  }

  p {
    color: ${props => props.theme.colors.text};
    padding: 16px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      > span {
        margin-left: 0px;
        color: #737380;
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

`;