// Copyright 2017-2019 @polkadot/apps authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';

import './SideBar.css';

import React from 'react';
import store from 'store';
import { Button, Icon, Menu } from '@polkadot/ui-app/index';

import routing from '../routing';
import translate from '../translate';
import Item from './Item';
import getLogo from './logos';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs';

type OuterLinkProps = {
  url: string,
  title: string,
  icon?: SemanticICONS
};

function OuterLink ({ url, title, icon = 'external alternate' }: OuterLinkProps) {
  return (
    <Menu.Item className='apps--SideBar-Item'>
      <a className='apps--SideBar-Item-NavLink' href={url} target='_blank'>
        <Icon name={icon} />
        <span className='text'>{title}</span>
      </a>
    </Menu.Item>
  );
}

type Props = I18nProps & {
  children?: React.ReactNode
};

type State = {
  isCollapsed: boolean
};

class SideBar extends React.PureComponent<Props, State> {
  state: State;

  constructor (props: Props) {
    super(props);

    const state = store.get('sidebar') || {};
    this.state = {
      isCollapsed: false,
      ...state
    };
  }

  render () {
    const { children } = this.props;
    const { isCollapsed } = this.state;

    return (
      <div className={`apps--SideBar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Menu
          secondary
          vertical
        >
          {this.renderJoystreamLogo()}
          {this.renderRoutes()}
          <Menu.Divider hidden />

          <OuterLink url='https://sparta.joystream.org/faucet' title='Free Tokens' />
          <OuterLink url='https://blog.joystream.org/sparta/' title='Earn Monero' />

          {/* {this.renderGithub()} */}
          {/* {this.renderWiki()} */}
          <Menu.Divider hidden />
          {
            isCollapsed
              ? null
              : children
          }
          {this.renderCollapse()}
        </Menu>
      </div>
    );
  }

  private collapse = (): void => {
    this.setState(({ isCollapsed }: State) => ({
      isCollapsed: !isCollapsed
    }), () => {
      store.set('sidebar', this.state);
    });
  }

  private renderCollapse () {
    const { isCollapsed } = this.state;

    return (
      <div className='apps--SideBar-collapse'>
        <Button
          icon={`angle double ${isCollapsed ? 'right' : 'left'}`}
          isBasic
          isCircular
          onClick={this.collapse}
        />
      </div>
    );
  }

  // @ts-ignore is declared but its value is never read
  private renderLogo () {
    const { isCollapsed } = this.state;
    const logo = getLogo(isCollapsed);

    return (
      <img
        alt='polkadot'
        className='apps--SideBar-logo'
        src={logo}
      />
    );
  }

  private renderJoystreamLogo () {
    const { isCollapsed } = this.state;
    const logo = isCollapsed
      ? 'images/logo-j.svg'
      : 'images/logo-joytream.svg';

    return (
      <img
        alt='Joystream'
        className='apps--SideBar-logo'
        src={logo}
      />
    );
  }

  private renderRoutes () {
    const { t } = this.props;

    return routing.routes.map((route, index) => (
      route
        ? (
          <Item
            key={route.name}
            t={t}
            route={route}
          />
        )
        : (
          <Menu.Divider
            hidden
            key={index}
          />
        )
    ));
  }

  // @ts-ignore is declared but its value is never read
  private renderGithub () {
    return (
      <Menu.Item className='apps--SideBar-Item'>
        <a
          className='apps--SideBar-Item-NavLink'
          href='https://github.com/polkadot-js/apps'
        >
          <Icon name='github' /><span className='text'>GitHub</span>
        </a>
      </Menu.Item>
    );
  }

  // @ts-ignore is declared but its value is never read
  private renderWiki () {
    return null;

    // disabled for now, we need the space
    // return (
    //   <Menu.Item className='apps--SideBar-Item'>
    //     <a
    //       className='apps--SideBar-Item-NavLink'
    //       href='https://github.com/w3f/Web3-wiki/wiki/Polkadot'
    //     >
    //       <Icon name='book' /> Wiki
    //     </a>
    //   </Menu.Item>
    // );
  }
}

export default translate(SideBar);
