import styled from "styled-components";

export const Container = styled.div`
  header {
    padding: 24px;
    border-bottom: 1px solid #e2e2e2;

    .content {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-height: 45px;
      }

      > div {
        display: flex;
        gap: 16px;

        button {
          height: 40px;
        }
      }

      .section-content {
        display: flex;
        align-items: center;

        .button-singout {
          border: 0;
          background: transparent;
          cursor: pointer;

          svg {
            color: ${(props) => props.theme.colors.text};
            width: 24px;
            height: 24px;
          }       
        }
      }
    }
  }

  main {
    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 32px 0 24px;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Poppins", sans-serif;
        font-size: 24px;
        color: ${(props) => props.theme.colors.text};
      }

      span {
        margin-left: 16px;
        background: #e559f9;
        border-radius: 9999px;
        padding: 8px 16px;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
      }
    }

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 16px;
        border-radius: 8px;
        background: ${(props) => props.theme.colors.input};
        color: ${(props) => props.theme.colors.text};
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        resize: vertical;
        min-height: 130px;
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;

        .user-info {
          display: flex;
          align-items: center;

          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }

          > span {
            margin-left: 8px;
            color: ${(props) => props.theme.colors.text};
            font-weight: 500;
            font-size: 14px;
          }
        }

        span {
          font-size: 14px;
          color: #737380;
          font-weight: 500;

          button {
            background: transparent;
            border: 0;
            color: #835afd;
            text-decoration: underline;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }
  }

  .question-list {
    margin-top: 32px;
  }

  @media (max-width: 900px) {
    main {
      h1 {
        padding: 16px;
      }
      form {
        padding: 16px;
      }
    }

    .question-list {
      padding: 16px;
    }
  }

  @media (max-width: 500px) {
    header {
      .content {
        display: flex;
        flex-direction: column;

        img {
          margin-bottom: 8px;
        }
      }
    }

    main {
      .room-title {
        padding: 10px 16px;
        display: grid;
        grid-template-columns: 2fr 1fr;

        span {
          width: 120px;
        }
      }
    }
  }
`;
