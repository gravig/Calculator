export default `
    .calculator {
        position: relative;
        width: 300px;
        font-size: 22px;
    }
    .calculator__wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 120%;
    }
    .calculator .calculator__container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #1D293A;
        border-radius: 4px;
        padding: 10px 6px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
        display: flex;
        flex-direction: column;
    }
    .calculator .calculator__container .container__content {
        display: flex;
        flex-direction: column;
        flex: 4;
    }
    .screen {
        display: flex;
        justify-content: flex-end;
        font-size: 1em;
        margin-bottom: 4px;
        align-items: center;
        height: 38px;
        background-color: #2f3b4d;
        padding: 0 10px;
        margin: 0 2px 5px 2px;
        overflow: hidden;
        flex: 1;
    }
    .key {
        transition: all 75ms ease-in-out;
        font-size: 1em;
        border-radius: 2px;
        background-color: #354357;
        border: none;
        color: #fff;
        margin: 2px;
        min-width: 20%;
        flex: 1;
    }
    .key:hover {
        background-color: #2f3b4d;
        cursor: pointer;
    }
`;
