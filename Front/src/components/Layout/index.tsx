/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import Sidebar from '../Sidebar';
import styled from 'styled-components';
import media from '../../helpers/media';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-areas:
    'header'
    'content'
    'sidebar';
  ${media.desktop} {
    grid-template-rows: 100px calc(100vh - 100px) auto;
    grid-template-columns: 238px minmax(34px, 54px) auto 34px;
    grid-template-areas:
      'sidebar . content .'
      'sidebar . content .'
      'sidebar . content .';
  }
`;

const LeftSidebarWrapper = styled(Sidebar)`
  grid-area: sidebar;
  z-index: 900;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  ${media.desktop} {
    position: unset;
    bottom: unset;
    left: unset;
    right: unset;
  }
`;

const Content = styled.main`
  grid-area: content;
  overflow-y: auto;
  justify-content: center;
  margin: 57px;
`;

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <Container>
      <LeftSidebarWrapper />
      <Content>{children}</Content>
    </Container>
  );
}
