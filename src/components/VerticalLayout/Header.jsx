import PropTypes from 'prop-types';
import React, { useState } from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import megamenuImg from "../../assets/images/megamenu-img.png";

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

import logo from "../../assets/images/logo.svg";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoLightPng from '../../assets/images/logo-light.png';
//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

const Header = props => {
  const [search, setsearch] = useState(false);
  const [megaMenu, setmegaMenu] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <button
              type='button'
              onClick={() => {
                tToggle()
              }}
              className='btn btn-sm px-3 font-size-16 header-item '
              id='vertical-menu-btn'
            >
              <i className='fa fa-fw fa-bars' />
            </button>
            <div className=''>
                <span className='logo-sm'>
                  <img src={logoLightPng} alt='' height='50' />
                </span>
            </div>
          </div>
          <div className='d-flex'>
            <LanguageDropdown />
            <Dropdown
              className='d-none d-lg-inline-block ms-1'
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp)
              }}
            >
              <DropdownToggle
                className='btn header-item noti-icon '
                tag='button'
              >
                <i className='bx bx-customize' />
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-lg dropdown-menu-end'>
                <div className='px-lg-2'>
                  <Row className='no-gutters'>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={github} alt='Github' />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={bitbucket} alt='bitbucket' />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={dribbble} alt='dribbble' />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className='no-gutters'>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={dropbox} alt='dropbox' />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={mail_chimp} alt='mail_chimp' />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={slack} alt='slack' />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown>

            <div className='dropdown d-none d-lg-inline-block ms-1'>
              <button
                type='button'
                onClick={() => {
                  toggleFullscreen()
                }}
                className='btn header-item noti-icon '
                data-toggle='fullscreen'
              >
                <i className='bx bx-fullscreen' />
              </button>
            </div>

            <NotificationDropdown />
            <ProfileMenu />

            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar)
              }}
              className='dropdown d-inline-block'
            >
              <button
                type='button'
                className='btn header-item noti-icon right-bar-toggle '
              >
                <i className='bx bx-cog bx-spin' />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
