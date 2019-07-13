/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import Collapse from "./Collapse";
import { storiesOf } from "@storybook/react";
import Component from "@reach/component-component";
import "components/base/base.scss";
import "~/stories/storybook.scss";
import Down from "components/icons/Down";

const Text = styled.p`
  padding: 1rem;
  margin: 0;
`;

const Container = styled.div`
  max-width: 500px;
  padding: 1rem;
`;

const Toggle = styled.button`
  font-size: inherit;
  width: 100%;
  font-size: 100%;
  background: transparent;
  box-shadow: none;
  width: 100%;
  margin: 0;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: purple;
`;

export default function CollapseStory() {
  storiesOf("Collapses", module)
    .add("default", () => (
      <Component initialState={{ isOpen: false }}>
        {({ state, setState }) => (
          <Container>
            <Toggle onClick={() => setState({ isOpen: !state.isOpen })}>
              toggle
            </Toggle>
            <Collapse isOpen={state.isOpen}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <p className="text">below content</p>
          </Container>
        )}
      </Component>
    ))

    .add("multiple", () => (
      <Component initialState={{ isOpen1: false, isOpen2: false }}>
        {({ state, setState }) => (
          <>
            <Container>
              <Toggle onClick={() => setState({ isOpen1: !state.isOpen1 })}>
                toggle
              </Toggle>
              <Collapse isOpen={state.isOpen1}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </Collapse>
            </Container>
            <Container>
              <Toggle onClick={() => setState({ isOpen2: !state.isOpen2 })}>
                Toggle
              </Toggle>
              <Collapse isOpen={state.isOpen2}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </Collapse>
            </Container>
          </>
        )}
      </Component>
    ))

    .add("collapse-all", () => <CollapseAll />);
}

function Block({ isOpen, title, onToggle, children }) {
  const style = css`
    border: 1px solid #ccc;
    margin-bottom: 10px;
  `;

  return (
    <div css={style}>
      <Toggle onClick={onToggle}>
        <span>{title}</span>
        <Down isOpen={isOpen} />
      </Toggle>
      <Collapse layoutEffect isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
}

function reducer(state, { type, index }) {
  switch (type) {
    case "expand-all":
      return [true, true, true];
    case "collapse-all":
      return [false, false, false];
    case "toggle":
      state[index] = !state[index];
      return [...state];

    default:
      throw new Error();
  }
}

function CollapseAll() {
  const [state, dispatch] = React.useReducer(reducer, [false, false, false]);

  const style = css`
    max-width: 600px;
    margin: 0 auto;
    padding: 10px;
  `;

  const headerStyle = css`
    margin-bottom: 40px;

    button {
      font-size: 100%;
      background: none;
      padding: 10px;

      + button {
        margin-left: 10px;
      }
    }
  `;

  return (
    <div className="collapse-all" css={style}>
      <header css={headerStyle}>
        <button
          onClick={() => dispatch({ type: "expand-all" })}
          disabled={state.every(s => s === true)}
        >
          Expand all
        </button>
        <button
          onClick={() => dispatch({ type: "collapse-all" })}
          disabled={state.every(s => s === false)}
        >
          Collapse all
        </button>
      </header>

      <Block
        title="Cargo details"
        isOpen={state[0]}
        onToggle={() => dispatch({ type: "toggle", index: 0 })}
      >
        <div className="content">
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block>

      <Block
        title="Your details"
        isOpen={state[1]}
        onToggle={() => dispatch({ type: "toggle", index: 1 })}
      >
        <div
          css={{
            padding: "10px 10px 30px"
          }}
        >
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block>

      <Block
        title="Handling instructions"
        isOpen={state[2]}
        onToggle={() => dispatch({ type: "toggle", index: 2 })}
      >
        <div className="content">
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block>

      <p>Some content below the collapsibles.</p>
    </div>
  );
}
