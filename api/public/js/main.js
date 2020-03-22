(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+Aij":
/*!******************************************************!*\
  !*** ./resources/src/components/App/AppWithAuth.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _actions_authActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/authActions */ "O7Nk");
/* harmony import */ var _actions_settingsActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/settingsActions */ "aT6W");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/api */ "B/6j");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/storage */ "k83H");
/* harmony import */ var _Modals_ChangePasswordWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Modals/ChangePasswordWidget */ "X14/");
/* harmony import */ var _Views_Login__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Views/Login */ "K4P2");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./App */ "/Uwt");
/* harmony import */ var _Splash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Splash */ "iTBj");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};











var AppWithAuth = /** @class */ (function (_super) {
    __extends(AppWithAuth, _super);
    function AppWithAuth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            authState: 'sign-in',
            failedSettings: false,
            loadingUser: true,
            loadingSettings: true,
            loadingUnauthenticatedSettings: false,
            loginImageLoaded: false,
            passwordState: 'loading'
        };
        _this.handlePasswordChange = function () {
            _this.setState({ passwordState: 'valid' });
        };
        _this.isAuthenticated = function () {
            var token = localStorage.getItem(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["ACCESS_TOKEN"]);
            if (token) {
                return true;
            }
            else {
                return false;
            }
        };
        _this.handleSignOut = function (authState) {
            _this.setState(function (state) {
                return {
                    authState: state.authState !== 'sign-in' || state.authState === authState || !authState
                        ? state.authState
                        : authState,
                    passwordState: 'cancelled'
                };
            });
            Object(_utils_api__WEBPACK_IMPORTED_MODULE_5__["setAuthorizationToken"])(null);
            _this.forceUpdate();
        };
        _this.onSignIn = function () {
            _this.setState({
                loadingSettings: true,
                loadingUser: true,
                passwordState: 'valid'
            });
            return _this.fetchSettings()
                .then(function () {
                return _this.fetchCurrentUser();
            }, function () {
                _this.handleSignOut('failed-settings');
            });
        };
        _this.handleLoginImageLoaded = function () {
            _this.setState({ loginImageLoaded: true });
        };
        _this.fetchCurrentUser = function () {
            return _this.props.getCurrentUser()
                .then(function () {
                _this.setState({
                    loadingUser: false,
                    passwordState: _this.props.currentUser.password_expired ? 'expired' : 'valid'
                });
            });
        };
        _this.fetchSettings = function () {
            return _this.props.fetchSettings()
                .then(function () {
                _this.setState({ loadingSettings: false });
            });
        };
        _this.fetchUnauthenticatedSettings = function () {
            if (!_this.state.loadingUnauthenticatedSettings) {
                _this.setState({ loadingUser: false, loadingSettings: false, loadingUnauthenticatedSettings: true });
            }
            return _this.props.fetchUnauthenticatedSettings()
                .then(function () {
                _this.setState({ loadingUnauthenticatedSettings: false });
            }, function () {
                _this.setState({ failedSettings: true });
            });
        };
        return _this;
    }
    AppWithAuth.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.loadingSettings || !this.state.loadingUser) {
            this.setState({ loadingSettings: true, loadingUser: true });
        }
        if (this.isAuthenticated()) {
            return this.fetchCurrentUser()
                .then(function () {
                _this.props.fetchSettings()
                    .then(function () {
                    _this.setState({ loadingSettings: false });
                }, function () {
                    _this.fetchUnauthenticatedSettings();
                    _this.handleSignOut('failed-settings');
                });
            }, function () {
                _this.fetchUnauthenticatedSettings(); // Fall back on unauthenticated settings
                _this.handleSignOut('unauthenticated');
            });
        }
        else {
            this.setState({ loadingUser: false, loadingSettings: false, loadingUnauthenticatedSettings: true });
            this.fetchUnauthenticatedSettings();
        }
    };
    AppWithAuth.prototype.render = function () {
        var _this = this;
        var passwordExpired = this.state.passwordState === 'expired';
        var passwordCancelled = this.state.passwordState === 'cancelled';
        var isLoading = this.state.loadingUser || this.state.loadingSettings || this.state.loadingUnauthenticatedSettings;
        var isAuthenticated = this.isAuthenticated();
        var showSplash = (isAuthenticated && (isLoading || passwordExpired)) || !this.state.loginImageLoaded;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Splash__WEBPACK_IMPORTED_MODULE_10__["Splash"], { in: showSplash, showChildren: passwordExpired || passwordCancelled },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_ChangePasswordWidget__WEBPACK_IMPORTED_MODULE_7__["default"], { variant: 'persistant', disallowed: this.props.currentUser ? [this.props.currentUser.username] : undefined, onClose: this.handleSignOut, onSignOut: this.props.logout, onChangePassword: this.handlePasswordChange })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { path: '/login', render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Views_Login__WEBPACK_IMPORTED_MODULE_8__["default"], __assign({}, props, { onSignIn: _this.onSignIn, authState: _this.state.authState, failedSettings: _this.state.failedSettings, onImageLoad: _this.handleLoginImageLoaded }))); } }),
                    !(isLoading || passwordExpired) && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { path: '/', render: function (props) {
                            return _this.isAuthenticated() ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_9__["default"], { onSignOut: _this.handleSignOut, currentUser: _this.props.currentUser, didMount: _this.handleLoginImageLoaded })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], { to: {
                                    pathname: '/login',
                                    state: { from: props.location }
                                } }));
                        } }))))));
    };
    return AppWithAuth;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapDispatchToProps = {
    getCurrentUser: _actions_authActions__WEBPACK_IMPORTED_MODULE_3__["getCurrentUser"],
    fetchSettings: _actions_settingsActions__WEBPACK_IMPORTED_MODULE_4__["fetchSettings"],
    fetchUnauthenticatedSettings: _actions_settingsActions__WEBPACK_IMPORTED_MODULE_4__["fetchUnauthenticatedSettings"],
    logout: _actions_authActions__WEBPACK_IMPORTED_MODULE_3__["logout"]
};
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    settings: state.settings.items
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppWithAuth));


/***/ }),

/***/ "/+u1":
/*!***************************************************************!*\
  !*** ./resources/src/components/Views/CredentialsManager.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _actions_authActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/authActions */ "O7Nk");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_userActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/userActions */ "wWKE");
/* harmony import */ var _Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Table/EnhancedTable */ "0q+F");
/* harmony import */ var _Modals_ConfirmPasswordDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Modals/ConfirmPasswordDialog */ "Vdut");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../TopNav */ "qcP7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();









var CredentialsManager = /** @class */ (function (_super) {
    __extends(CredentialsManager, _super);
    function CredentialsManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            authAction: null,
            confirmPasswordDialogOpen: false,
            loading: false,
            selected: []
        };
        _this.onUsersSelect = function (selected) {
            _this.setState({ selected: selected });
        };
        _this.handleAuthAction = function (authAction) {
            _this.setState({
                authAction: authAction,
                confirmPasswordDialogOpen: true
            });
        };
        _this.handleCancelAuthAction = function () {
            _this.setState({ confirmPasswordDialogOpen: false });
        };
        _this.onSubmitAuthAction = function () {
            var action;
            var snackbarMessage;
            switch (_this.state.authAction) {
                case 'reset-passwords':
                    action = _actions_authActions__WEBPACK_IMPORTED_MODULE_3__["resetPasswords"];
                    snackbarMessage = 'Reset passwords successfully.';
                    break;
                case 'invalidate-passwords':
                    action = _actions_authActions__WEBPACK_IMPORTED_MODULE_3__["invalidatePasswords"];
                    snackbarMessage = 'Invalidated passwords successfully.';
                    break;
                case 'disable-users':
                    action = _actions_authActions__WEBPACK_IMPORTED_MODULE_3__["disableUsers"];
                    snackbarMessage = 'Disabled accounts successfully.';
                    break;
                case 'reenable-users':
                    action = _actions_authActions__WEBPACK_IMPORTED_MODULE_3__["reenableUsers"];
                    snackbarMessage = 'Reenabled accounts successfully.';
                    break;
            }
            return action(_this.state.selected.map(function (index) { return _this.props.users[index].id; }))
                .then(function () {
                return _this.props.fetchUsers()
                    .then(function () {
                    _this.props.queueSnackbar({ message: snackbarMessage });
                });
            }, function (error) {
                console.error(error);
            });
        };
        return _this;
    }
    CredentialsManager.prototype.componentDidMount = function () {
        var _this = this;
        document.title = 'Credentials Manager - Spotlight';
        this.setState({ loading: true });
        this.props.fetchUsers()
            .then(function () {
            _this.setState({ loading: false });
        });
    };
    CredentialsManager.prototype.render = function () {
        var _this = this;
        var currentUser = this.props.currentUser;
        if (currentUser && (currentUser.account_type === 'student'
            || (currentUser.account_type === 'staff' && !currentUser.details.administrator))) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], { to: '/' });
        }
        var users = this.props.users.map(function (user, index) {
            return {
                id: index,
                name: user.details.name,
                first_name: user.account_type !== 'sysadmin' ? user.details.first_name : null,
                last_name: user.account_type !== 'sysadmin' ? user.details.last_name : null,
                status: user.status,
                status_enum: user.status === 'Active' ? 'Active' : 'Disabled',
                password_status: user.password_expired ? 'Expired' : 'Valid',
                account_type: user.display_role
            };
        });
        var allDisabled = this.state.selected.every(function (id) { return users[id].status_enum === 'Disabled'; });
        var columns = [
            {
                id: 'name',
                label: 'Name',
                th: true,
                isNumeric: false,
                disablePadding: true,
                searchable: false,
                filterable: false,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First name',
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: false
            },
            {
                id: 'last_name',
                label: 'Last name',
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: false
            },
            {
                id: 'status',
                label: 'Account status',
                isNumeric: false,
                disablePadding: true,
                th: true,
                searchable: false,
                filterable: false,
                visible: true
            },
            {
                id: 'status_enum',
                label: 'Account status',
                isNumeric: false,
                searchable: false,
                filterable: true,
                visible: false,
                values: ['Active', 'Disabled']
            },
            {
                id: 'password_status',
                label: 'Password status',
                isNumeric: false,
                disablePadding: true,
                th: true,
                searchable: false,
                filterable: true,
                visible: true,
                values: ['Valid', 'Expired']
            },
            {
                id: 'account_type',
                label: 'Account type',
                isNumeric: false,
                disablePadding: true,
                th: true,
                searchable: false,
                filterable: true,
                visible: true,
                values: ['Student', 'Teacher', 'Administrator']
            },
        ];
        var tableActions = [
            { id: 'reset-passwords', name: 'Reset Password', callback: function () { return _this.handleAuthAction('reset-passwords'); } },
            { id: 'invalidate-passwords', name: 'Invalidate Password', callback: function () { return _this.handleAuthAction('invalidate-passwords'); } },
            allDisabled
                ? { id: 'reenable-users', name: 'Reenable Account', callback: function () { return _this.handleAuthAction('reenable-users'); } }
                : { id: 'disable-users', name: 'Disable Account', callback: function () { return _this.handleAuthAction('disable-users'); } }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_ConfirmPasswordDialog__WEBPACK_IMPORTED_MODULE_7__["ConfirmPasswordDialog"], { open: this.state.confirmPasswordDialogOpen, onClose: this.handleCancelAuthAction, onVerification: this.onSubmitAuthAction, actionItems: [
                    'Reset user passwords',
                    'Invalidate user passwords',
                    'Re-enable user accounts',
                    'Disable user accounts'
                ] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_8__["TopNav"], { breadcrumbs: [{ value: 'Credentials Manager' }] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_6__["EnhancedTable"], { showEmptyTable: false, title: 'Users', columns: columns, data: users, searchable: true, loading: this.state.loading, selected: this.state.selected, onSelect: this.onUsersSelect, defaultRowsPerPage: 10, actions: tableActions })));
    };
    return CredentialsManager;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    users: state.users.items,
}); };
var mapDispatchToProps = {
    fetchUsers: _actions_userActions__WEBPACK_IMPORTED_MODULE_5__["fetchUsers"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_4__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(CredentialsManager));


/***/ }),

/***/ "/Uwt":
/*!**********************************************!*\
  !*** ./resources/src/components/App/App.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/styles/main.scss */ "Ty2E");
/* harmony import */ var _assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/storage */ "k83H");
/* harmony import */ var _CheckIn_CheckIn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CheckIn/CheckIn */ "GAL+");
/* harmony import */ var _Reporting_Reporting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Reporting/Reporting */ "wULA");
/* harmony import */ var _Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Sidebar/Sidebar */ "jRkZ");
/* harmony import */ var _Snackbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Snackbar */ "a3Cx");
/* harmony import */ var _Views_CredentialsManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Views/CredentialsManager */ "/+u1");
/* harmony import */ var _Views_NotFound__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Views/NotFound */ "KpP2");
/* harmony import */ var _Views_PowerScheduler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Views/PowerScheduler */ "0GfX");
/* harmony import */ var _Views_Settings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Views/Settings */ "G10q");
/* harmony import */ var _Views_Staff__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Views/Staff */ "JfGg");
/* harmony import */ var _Views_StaffProfile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Views/StaffProfile */ "U/No");
/* harmony import */ var _Views_StudentProfile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Views/StudentProfile */ "03yi");
/* harmony import */ var _Views_Students__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Views/Students */ "zHmr");
/* harmony import */ var _Wiki_Wiki__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Wiki/Wiki */ "IUXy");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


















var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            menuOpen: true
        };
        _this.handleToggleMenuOpen = function () {
            _this.setState(function (state) {
                Object(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["writeObjectToLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["MENU_OPEN"], !state.menuOpen === true ? 1 : 0);
                return {
                    menuOpen: !state.menuOpen
                };
            });
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var localStorageMenuOpen = Object(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["getObjectFromLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["MENU_OPEN"]);
        if (localStorageMenuOpen === null) {
            Object(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["writeObjectToLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["MENU_OPEN"], 1);
        }
        else {
            this.setState({ menuOpen: Boolean(localStorageMenuOpen) });
        }
        this.props.didMount();
    };
    App.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["BrowserRouter"], null,
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('site-wrap', { '--menu_open': this.state.menuOpen }) }, ['staff', 'sysadmin'].includes(this.props.currentUser.account_type) ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_7__["default"], { routeComponentProps: props, onSignOut: _this.props.onSignOut, onToggleMenuOpen: _this.handleToggleMenuOpen })); } }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/', exact: true, render: function () { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], { to: '/check-in' }); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/check-in', render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_CheckIn_CheckIn__WEBPACK_IMPORTED_MODULE_5__["default"], __assign({}, props))); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/credentials-manager', component: _Views_CredentialsManager__WEBPACK_IMPORTED_MODULE_9__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/power-scheduler', component: _Views_PowerScheduler__WEBPACK_IMPORTED_MODULE_11__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { exact: true, path: '/reporting', render: function (props) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Reporting_Reporting__WEBPACK_IMPORTED_MODULE_6__["default"], __assign({}, props, { reportingRoute: 'unselected' })); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { exact: true, path: '/reporting/new', render: function (props) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Reporting_Reporting__WEBPACK_IMPORTED_MODULE_6__["default"], __assign({}, props, { reportingRoute: 'new' })); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { exact: true, path: '/reporting/:reportID', render: function (props) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Reporting_Reporting__WEBPACK_IMPORTED_MODULE_6__["default"], __assign({}, props, { reportingRoute: 'saved' })); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/settings', component: _Views_Settings__WEBPACK_IMPORTED_MODULE_12__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/staff/:staffID', render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Views_StaffProfile__WEBPACK_IMPORTED_MODULE_14__["default"], __assign({}, props))); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/staff', component: _Views_Staff__WEBPACK_IMPORTED_MODULE_13__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/students/:studentID', render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Views_StudentProfile__WEBPACK_IMPORTED_MODULE_15__["default"], __assign({}, props))); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/students', component: _Views_Students__WEBPACK_IMPORTED_MODULE_16__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { exact: true, path: '/wiki', render: function (props) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Wiki_Wiki__WEBPACK_IMPORTED_MODULE_17__["default"], __assign({}, props, { wikiRoute: 'none' })); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { exact: true, path: '/wiki/:groupId', render: function (props) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Wiki_Wiki__WEBPACK_IMPORTED_MODULE_17__["default"], __assign({}, props, { wikiRoute: 'group' })); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { exact: true, path: '/wiki/post/:postId', render: function (props) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Wiki_Wiki__WEBPACK_IMPORTED_MODULE_17__["default"], __assign({}, props, { wikiRoute: 'post' })); } }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { component: _Views_NotFound__WEBPACK_IMPORTED_MODULE_10__["NotFound"] })))) : (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { path: '/profile', render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Views_StudentProfile__WEBPACK_IMPORTED_MODULE_15__["default"], __assign({}, props, { onSignOut: _this.props.onSignOut }))); } }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { render: function () { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], { to: '/profile' })); } })))),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Snackbar__WEBPACK_IMPORTED_MODULE_8__["default"], null))));
    };
    return App;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "/dgb":
/*!***************************************************!*\
  !*** ./resources/src/reducers/settingsReducer.ts ***!
  \***************************************************/
/*! exports provided: settingsReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingsReducer", function() { return settingsReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: []
};
var settingsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_SETTINGS"]:
            return __assign({}, state, { items: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "01Up":
/*!*********************************************************!*\
  !*** ./resources/src/components/Form/LoadingButton.tsx ***!
  \*********************************************************/
/*! exports provided: LoadingButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingButton", function() { return LoadingButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


var LoadingButton = function (props) {
    var children = props.children, disabled = props.disabled, loading = props.loading, rest = __rest(props, ["children", "disabled", "loading"]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], __assign({}, rest, { disabled: disabled || loading }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'button-container' },
            loading && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["CircularProgress"], { size: 24, className: 'button-progress' })),
            children)));
};


/***/ }),

/***/ "03yi":
/*!***********************************************************!*\
  !*** ./resources/src/components/Views/StudentProfile.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_authActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/authActions */ "O7Nk");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_starActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/starActions */ "BHus");
/* harmony import */ var _actions_studentProfileActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/studentProfileActions */ "vyTZ");
/* harmony import */ var _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/studentScheduleActions */ "60lH");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Calendar_Calendar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Calendar/Calendar */ "NmQr");
/* harmony import */ var _Calendar_CancelAppointment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Calendar/CancelAppointment */ "gWuD");
/* harmony import */ var _Calendar_NewAmendment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Calendar/NewAmendment */ "yNeP");
/* harmony import */ var _Calendar_NewAppointment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Calendar/NewAppointment */ "FRPp");
/* harmony import */ var _Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Form/LoadingIconButton */ "x2q7");
/* harmony import */ var _Modals_ChangePasswordWidget__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Modals/ChangePasswordWidget */ "X14/");
/* harmony import */ var _Modals_PlanWidget__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Modals/PlanWidget */ "6n2l");
/* harmony import */ var _Modals_StudentInfoDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../Modals/StudentInfoDialog */ "eYs1");
/* harmony import */ var _StarButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../StarButton */ "elSr");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../TopNav */ "qcP7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





















var StudentProfile = /** @class */ (function (_super) {
    __extends(StudentProfile, _super);
    function StudentProfile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingProfile: false,
            loadingSchedule: false,
            loadingSignOut: false,
            editDialogOpen: false,
            calendarDialogOpen: false,
            studentID: -1,
            menuRef: null,
            blockDetails: null,
            cancelAppointmentDialogOpen: false,
            cancelAppointmentDialogItem: null,
            cancelAppointment: null,
        };
        _this.toggleStarred = function (isStarred) {
            if (_this.props.currentUser.account_type !== 'staff') {
                return;
            }
            var starredItem = {
                item_id: _this.props.student.id,
                item_type: 'student'
            };
            if (isStarred) {
                _this.props.unstarItem(starredItem);
            }
            else {
                _this.props.starItem(starredItem);
            }
        };
        _this.handleMenuOpen = function (event) {
            _this.setState({ menuRef: event.currentTarget });
        };
        _this.handleMenuClose = function () {
            _this.setState({ menuRef: null });
        };
        _this.handleOpenEditDialog = function () {
            _this.handleMenuClose();
            _this.setState({ editDialogOpen: true });
        };
        _this.handleCloseEditDialog = function () {
            _this.setState({ editDialogOpen: false });
        };
        _this.getURLDateTime = function () {
            var searchParams = new URLSearchParams(_this.props.location.search);
            return searchParams.get('date');
        };
        _this.setURLDateTime = function (dateTime) {
            _this.props.history.push({
                pathname: _this.props.location.pathname,
                search: "?date=" + dateTime
            });
        };
        _this.fetchSchedule = function (dateTime) {
            _this.setState({ loadingSchedule: true });
            if (!_this.props.currentUser) {
                return;
            }
            var studentID = _this.isOwnProfile() ? undefined : _this.state.studentID;
            _this.props.fetchStudentSchedule(studentID, dateTime || _this.getURLDateTime()).then(function (res) {
                _this.setState({ loadingSchedule: false });
            });
        };
        _this.handlePrevious = function () {
            if (_this.props.schedule.previous) {
                _this.fetchSchedule(_this.props.schedule.previous);
                _this.setURLDateTime(_this.props.schedule.previous);
            }
        };
        _this.handleNext = function () {
            if (_this.props.schedule.next) {
                _this.fetchSchedule(_this.props.schedule.next);
                _this.setURLDateTime(_this.props.schedule.next);
            }
        };
        _this.handleDatePickerChange = function (date) {
            _this.fetchSchedule(date.toISOString());
            _this.setURLDateTime(date.toISOString());
        };
        _this.handleBlockClick = function (blockDetails) {
            _this.setState({ blockDetails: blockDetails });
        };
        _this.handleCalendarDialogOpen = function () {
            _this.setState({ calendarDialogOpen: true });
        };
        _this.handleCalendarDialogClose = function () {
            _this.setState({ calendarDialogOpen: false });
        };
        _this.handleCancelAppointmentDialogOpen = function (appointment) {
            _this.setState({
                cancelAppointmentDialogOpen: true,
                cancelAppointment: appointment
            });
        };
        _this.handleCancelAppointmentDialogClose = function () {
            _this.setState({
                cancelAppointmentDialogOpen: false,
                calendarDialogOpen: false
            });
        };
        _this.handleCancelAppointment = function (appointment) {
            var appointmentID = appointment.id;
            var studentID = _this.isOwnProfile() ? undefined : _this.state.studentID;
            return Object(_actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_9__["deleteAppointment"])(appointmentID)
                .then(function (res) {
                return _this.props.fetchStudentSchedule(studentID, _this.getURLDateTime());
            });
        };
        _this.handleCreateAppointment = function (newAppointment) {
            var studentID = _this.isOwnProfile() ? undefined : _this.state.studentID;
            var appointment = {
                student_id: studentID,
                memo: newAppointment.memo,
                clear_schedule: newAppointment.clearSchedule,
                block_id: _this.state.blockDetails.block_id,
                date: _this.state.blockDetails.date
            };
            return Object(_actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_9__["createAppointment"])(appointment)
                .then(function () {
                return _this.props.fetchStudentSchedule(studentID, _this.getURLDateTime());
            })
                .catch(function (error) {
                var response = error.response;
                if (response && response.data.message) {
                    _this.props.queueSnackbar({ message: response.data.message });
                }
                else {
                    _this.props.queueSnackbar({ message: 'The appointment could not be created.' });
                }
            });
        };
        _this.getStudentID = function () {
            return _this.props.currentUser.account_type === 'student'
                ? _this.props.currentUser.details.id
                : _this.state.studentID;
        };
        _this.isOwnProfile = function () {
            return _this.props.currentUser
                && _this.props.currentUser.account_type === 'student';
        };
        _this.handleSignOut = function () {
            _this.setState({ loadingSignOut: true });
            _this.props.logout()
                .then(function () {
                _this.props.onSignOut();
            })
                .catch(function () {
                _this.props.onSignOut();
            });
        };
        _this.onSetStudentPlan = function () {
            return _this.props.fetchStudentSchedule(undefined, _this.getURLDateTime())
                .then(function () {
                _this.props.queueSnackbar({
                    message: 'Set Plan successfully.'
                });
            });
        };
        _this.handleCreateAmendment = function () {
            var studentID = _this.isOwnProfile() ? undefined : _this.state.studentID;
            return _this.props.fetchStudentSchedule(studentID, _this.getURLDateTime())
                .then(function () {
                _this.setState({ calendarDialogOpen: false });
            });
        };
        return _this;
    }
    StudentProfile.prototype.componentWillMount = function () {
        var params = this.props.match.params;
        var studentID = params.studentID;
        this.setState({ studentID: studentID });
    };
    StudentProfile.prototype.componentDidMount = function () {
        var _this = this;
        var studentID = this.isOwnProfile() ? undefined : this.state.studentID;
        this.fetchSchedule();
        this.setState({ loadingProfile: true });
        this.props.fetchStudentSchedule(studentID).then(function (res) {
            _this.setState({ loadingSchedule: false });
        });
        this.props.fetchStudentProfile(studentID).then(function (res) {
            _this.setState({ loadingProfile: false });
        });
    };
    StudentProfile.prototype.render = function () {
        var _this = this;
        var starred = this.props.newStarred
            && this.props.newStarred.item_id === this.props.student.id
            && this.props.newStarred.item_type === 'student' ? (this.props.newStarred.isStarred !== false) : this.props.student.starred;
        var avatarColor = this.props.student.color || 'red';
        var studentID = this.getStudentID();
        var _a = this.state, menuRef = _a.menuRef, editDialogOpen = _a.editDialogOpen;
        var menuOpen = Boolean(this.state.menuRef);
        var studentDetails = {
            id: this.props.student.id,
            first_name: this.props.student.first_name,
            last_name: this.props.student.last_name,
            grade: this.props.student.grade,
            student_number: this.props.student.student_number || undefined,
            initials: this.props.student.initials,
            color: this.props.student.color
        };
        var calendar = null;
        if (this.props.schedule && !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["isEmpty"])(this.props.schedule)) {
            calendar = this.props.schedule.schedule.map(function (scheduleDay) {
                var calendarDay = {
                    date: scheduleDay.date,
                    events: scheduleDay.events,
                    blocks: scheduleDay.blocks.map(function (block) {
                        var title = block.amendments && block.amendments.length > 0 ? ('Block Amended') : (block.flex ? (block.logs[0] ? (block.logs[0].staff.name) : (block.scheduled ? block.scheduled.name : 'No Schedule')) : (block.scheduled.name));
                        var memo = block.amendments && block.amendments.length > 0 ? (null) : (block.logs[0] && block.flex && block.logs[0].topic ? block.logs[0].topic.memo : null);
                        var variant = block.amendments && block.amendments.length ? 'void' : (block.logs[0] ? 'attended' : (block.pending ? 'pending' : 'missed'));
                        var data = {
                            amendments: Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["makeArray"])(block.amendments),
                            appointments: Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["makeArray"])(block.appointments),
                            ledgerEntries: Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["makeArray"])(block.logs),
                            scheduled: Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["makeArray"])(block.scheduled)
                        };
                        var details = {
                            block_id: block.id,
                            date: scheduleDay.date.day + " " + scheduleDay.date.full_date,
                            start: block.start,
                            end: block.end,
                            flex: block.flex,
                            label: block.label,
                            pending: block.pending,
                            data: data
                        };
                        var calendarBlock = {
                            title: title,
                            variant: variant,
                            badgeCount: block.appointments.length || 0,
                            memo: memo,
                            details: details
                        };
                        return calendarBlock;
                    })
                };
                return calendarDay;
            });
        }
        var calendarDialogGroups = [
            {
                name: 'Logs',
                keys: ['ledgerEntries', 'amendments'],
                itemMaps: [
                    function (log) { return ({
                        id: log.id,
                        time: log.time,
                        title: log.staff.name,
                        memo: log.topic ? log.topic.memo : 'No Topic',
                        variant: 'success',
                        method: log.method
                    }); },
                    function (amendment) { return ({
                        id: amendment.id,
                        time: 'Amended',
                        title: amendment.staff.name,
                        memo: amendment.memo,
                        method: 'amendment',
                        variant: 'default'
                    }); }
                ],
                emptyState: function (blockDetails) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "No attendance recorded"),
                    _this.props.currentUser.account_type === 'staff' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_NewAmendment__WEBPACK_IMPORTED_MODULE_13__["default"], { blockDetails: blockDetails, studentID: studentID, onSubmit: _this.handleCreateAmendment })))); }
            },
            {
                name: 'Appointments',
                keys: ['appointments'],
                itemMaps: [
                    function (appointment, blockDetails) { return ({
                        id: appointment.id,
                        title: appointment.staff.name,
                        memo: appointment.memo,
                        variant: blockDetails.pending ? 'pending' : (blockDetails.data.ledgerEntries
                            && blockDetails.data.ledgerEntries.some((function (log) { return (log.staff.id === appointment.staff.id); })) ? 'success' : 'fail')
                    }); }
                ],
                emptyState: function () { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "No appointments booked")); },
                child: function (blockDetails) {
                    return blockDetails.pending && _this.props.currentUser.account_type === 'staff' ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_NewAppointment__WEBPACK_IMPORTED_MODULE_14__["NewAppointment"], { onSubmit: _this.handleCreateAppointment, onClose: _this.handleCalendarDialogClose })) : undefined;
                },
                actions: function (appointment, blockDetails) {
                    return !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["isEmpty"])(appointment)
                        && _this.props.currentUser.account_type === 'staff'
                        && (_this.props.currentUser.details.administrator === true
                            || _this.props.currentUser.details.id === appointment.staff.id)
                        && blockDetails.pending ?
                        [
                            {
                                value: 'Cancel Appointment',
                                callback: function () { return Promise.resolve(_this.handleCancelAppointmentDialogOpen(appointment)); }
                            }
                        ] : undefined;
                }
            },
            {
                name: 'Scheduled',
                keys: ['scheduled'],
                itemMaps: [
                    function (scheduledItem, blockDetails) { return ({
                        title: scheduledItem.name,
                        variant: blockDetails.pending ? null : (blockDetails.flex === true ? (blockDetails.data.ledgerEntries
                            && blockDetails.data.ledgerEntries.some((function (log) { return (log.staff.id === scheduledItem.id); })) ? 'success' : 'fail') : (blockDetails.data && blockDetails.data.ledgerEntries
                            && blockDetails.data.ledgerEntries.length > 0 ? 'success' : 'fail')),
                        memo: scheduledItem.topic ? scheduledItem.topic.memo : undefined
                    }); }
                ],
                emptyState: function () { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "Nothing scheduled")); },
                child: function (blockDetails) { return (blockDetails.pending && _this.isOwnProfile() ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_PlanWidget__WEBPACK_IMPORTED_MODULE_17__["default"], { blockDetails: blockDetails, onSubmit: _this.onSetStudentPlan })) : undefined); }
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'content', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_CancelAppointment__WEBPACK_IMPORTED_MODULE_12__["CancelAppointment"], { open: this.state.cancelAppointmentDialogOpen, appointment: this.state.cancelAppointment, onClose: this.handleCancelAppointmentDialogClose, onSubmit: this.handleCancelAppointment }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_StudentInfoDialog__WEBPACK_IMPORTED_MODULE_18__["StudentInfoDialog"], { open: editDialogOpen, onClose: this.handleCloseEditDialog, onSubmit: null, edit: true, studentDetails: studentDetails }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'profile' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_20__["TopNav"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: 'profile_title' }, this.state.loadingProfile ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { height: 56, width: 368 } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { height: 56, width: 368 },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 0, y: 4, rx: 24, ry: 24, height: 48, width: 48 }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 64, y: 8, rx: 4, ry: 4, height: 24, width: 164 }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 240, y: 8, rx: 4, ry: 4, height: 24, width: 128 }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 64, y: 40, rx: 4, ry: 4, height: 12, width: 84 })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('profile_avatar', "--" + avatarColor) }, this.props.student.initials),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: 'name' }, this.props.student.first_name + " " + this.props.student.last_name,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'grade' }, "Grade " + this.props.student.grade)),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { onClick: function () { return null; } },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", { className: 'cluster-list' }, this.props.student.clusters && (Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["listToTruncatedString"])(this.props.student.clusters.map(function (cluster) { return cluster.name; }), 'Cluster'))))))))),
                    this.state.loadingProfile ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { height: 56, width: 80 } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { height: 56, width: 80 },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 0, y: 12, rx: 24, ry: 24, height: 36, width: 36 }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 44, y: 12, rx: 24, ry: 24, height: 36, width: 36 })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: 'right_col' }, this.isOwnProfile() ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_ChangePasswordWidget__WEBPACK_IMPORTED_MODULE_16__["default"], { variant: 'dialog' })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Sign Out' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_15__["LoadingIconButton"], { loading: this.state.loadingSignOut, onClick: function () { return _this.handleSignOut(); } },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "exit_to_app")))))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StarButton__WEBPACK_IMPORTED_MODULE_19__["StarButton"], { onClick: function () { return _this.toggleStarred(starred); }, isStarred: starred })))))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_11__["Calendar"], { hasNext: Boolean(this.props.schedule.next), hasPrevious: Boolean(this.props.schedule.previous), loading: this.state.loadingSchedule || !calendar, rangeLabel: this.props.schedule.range, minDate: this.props.schedule.min_date, maxDate: this.props.schedule.max_date, calendar: calendar, calendarDialogGroups: calendarDialogGroups, onNext: this.handleNext, onPrevious: this.handlePrevious, onDatePickerChange: this.handleDatePickerChange, onBlockClick: this.handleBlockClick, dialogOpen: this.state.calendarDialogOpen, onDialogOpen: this.handleCalendarDialogOpen, onDialogClose: this.handleCalendarDialogClose, onRefresh: function () { return _this.fetchSchedule(); } }))));
    };
    return StudentProfile;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    student: state.studentProfile.student,
    schedule: state.studentSchedule.schedule,
    newStarred: state.starred.item
}); };
var mapDispatchToProps = {
    fetchStudentProfile: _actions_studentProfileActions__WEBPACK_IMPORTED_MODULE_8__["fetchStudentProfile"],
    fetchStudentSchedule: _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_9__["fetchStudentSchedule"],
    starItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_7__["starItem"],
    unstarItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_7__["unstarItem"],
    logout: _actions_authActions__WEBPACK_IMPORTED_MODULE_5__["logout"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_6__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(StudentProfile));


/***/ }),

/***/ "0GfX":
/*!***********************************************************!*\
  !*** ./resources/src/components/Views/PowerScheduler.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @date-io/date-fns */ "mPma");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _material_ui_core_StepIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/StepIcon */ "TxG6");
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/pickers */ "K1a+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_staffActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/staffActions */ "XGI3");
/* harmony import */ var _actions_studentActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/studentActions */ "yi5S");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Table/EnhancedTable */ "0q+F");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../TopNav */ "qcP7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};













var initialState = {
    blockRange: { start: null, end: null },
    date: new Date(),
    datePickerOpen: null,
    dateRange: { start: new Date(), end: new Date() },
    error: false,
    selectedStaff: [],
    selectedStudents: [],
    loadingStaff: false,
    loadingStudents: false,
    loadingSubmit: false,
    memo: '',
    scheduleType: null,
    step: 0,
    studentType: null,
    subStep: 0,
    uploading: false,
};
var CreatePowerSchedule = /** @class */ (function (_super) {
    __extends(CreatePowerSchedule, _super);
    function CreatePowerSchedule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = initialState;
        _this.handleNextStep = function () {
            _this.setState(function (state) { return ({
                error: false,
                step: state.step + 1
            }); });
        };
        _this.handleResetStep = function () {
            _this.setState(__assign({}, initialState));
        };
        _this.handlePreviousStep = function () {
            _this.setState(function (state) { return ({
                error: false,
                step: state.step > 0 ? state.step - 1 : 0
            }); });
        };
        _this.handleNextSubStep = function () {
            _this.setState(function (state) { return ({
                error: false,
                subStep: state.subStep + 1
            }); });
        };
        _this.handlePreviousSubStep = function () {
            _this.setState(function (state) { return ({
                error: false,
                subStep: state.subStep > 0 ? state.subStep - 1 : 0
            }); });
        };
        _this.handleSetStudentSelected = function (selectedStudents) {
            _this.setState({ selectedStudents: selectedStudents });
        };
        _this.handleSetStaffSelected = function (selectedStaff) {
            _this.setState({ selectedStaff: selectedStaff });
        };
        _this.handleDatePickerSelect = function (date, key) {
            if (!key) {
                return;
            }
            _this.setState(function (state) {
                var _a;
                return {
                    dateRange: __assign({}, state.dateRange, (_a = {}, _a[key] = date, _a))
                };
            });
        };
        _this.handleMemoChange = function (event) {
            _this.setState({ memo: event.target.value });
        };
        _this.handleScheduleTypeChange = function (event) {
            _this.setState({ scheduleType: event.target.value });
        };
        _this.handleStudentTypeChange = function (event) {
            _this.setState({ studentType: event.target.value });
        };
        _this.handleSubmit = function () {
            _this.setState({ loadingSubmit: true });
            var data = {
                student_type: _this.state.studentType,
                schedule_type: _this.state.scheduleType,
                student_ids: _this.state.selectedStudents,
                staff_id: _this.state.selectedStaff[0],
                memo: _this.state.memo,
                date_time: _this.state.dateRange.start.toISOString()
            };
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/power-scheduler', data)
                .then(function (res) {
                _this.setState({
                    uploading: false,
                    step: 3
                });
            }, function () {
                _this.setState({
                    error: true,
                    uploading: false
                });
            });
        };
        return _this;
    }
    CreatePowerSchedule.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({
            loadingStaff: true,
            loadingStudents: true
        });
        this.props.fetchStudents()
            .then(function () {
            _this.setState({ loadingStudents: false });
        });
        this.props.fetchStaff()
            .then(function () {
            _this.setState({ loadingStaff: false });
        });
    };
    CreatePowerSchedule.prototype.render = function () {
        var _this = this;
        var studentTableColumns = [
            {
                id: 'last_name',
                label: 'Last Name',
                th: true,
                disablePadding: true,
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First Name',
                isNumeric: false,
                th: true,
                disablePadding: true,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'grade',
                label: 'Grade',
                th: false,
                isNumeric: true,
                disablePadding: false,
                searchable: false,
                filterable: true,
                visible: true
            }
        ];
        var staffTableColumns = [
            {
                id: 'last_name',
                label: 'Last Name',
                th: true,
                disablePadding: true,
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First Name',
                th: true,
                disablePadding: true,
                isNumeric: false,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'email',
                label: 'Email',
                isNumeric: false,
                th: true,
                disablePadding: true,
                searchable: true,
                filterable: true,
                visible: true
            }
        ];
        var students = this.props.students ? (this.props.students.map(function (student) {
            return {
                id: student.id,
                last_name: student.last_name,
                first_name: student.first_name,
                grade: student.grade
            };
        })) : [];
        var staff = this.props.staff ? (this.props.staff.map(function (staffUser) {
            return {
                id: staffUser.id,
                last_name: staffUser.last_name,
                first_name: staffUser.first_name,
                email: staffUser.email
            };
        })) : [];
        var SubStepIcon = function (letter) {
            return function (props) {
                var icon = props.icon, rest = __rest(props, ["icon"]);
                return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_StepIcon__WEBPACK_IMPORTED_MODULE_5__["default"], __assign({ icon: letter }, rest));
            };
        };
        var FinalStepContent = function (props) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'stepper-actions' },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'text', onClick: function () { return props.onPrevious(); } }, "Back"),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_10__["LoadingButton"], { variant: 'contained', color: 'primary', loading: _this.state.loadingSubmit, disabled: _this.state.memo.length === 0 || _this.state.selectedStaff.length === 0, onClick: function () { return _this.handleSubmit(); } }, "Submit"))); };
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'content', id: 'content' },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_12__["TopNav"], { breadcrumbs: [{ value: 'Power Scheduler' }] }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Stepper"], { activeStep: this.state.step, orientation: 'vertical' },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Step"], { key: 0 },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepLabel"], null, "Select Students"),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepContent"], null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControl"], { component: 'fieldset' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], { component: 'legend' }, "Student group"),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["RadioGroup"], { onChange: this.handleStudentTypeChange },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControlLabel"], { value: 'all', label: 'All Students', control: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Radio"], { color: 'primary', checked: this.state.studentType === 'all' }) }),
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControlLabel"], { value: 'some', label: 'Some Students', control: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Radio"], { color: 'primary', checked: this.state.studentType === 'some' }) }))),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { in: this.state.studentType === 'some' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Select students from the table below."),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_11__["EnhancedTable"], { title: 'Students', loading: this.state.loadingStudents, columns: studentTableColumns, data: students, onSelect: this.handleSetStudentSelected, selected: this.state.selectedStudents, searchable: true }),
                                (this.state.selectedStudents.length === students.length && students.length > 0) && (
                                // tslint:disable-next-line: max-line-length
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { color: 'error' },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "warning"),
                                    " Are you sure you don't mean to select All Students? Selecting All Students ensures that students added in the future are also affected."))),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'stepper-actions' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { disabled: !this.state.studentType
                                        || (this.state.studentType === 'some'
                                            && this.state.selectedStudents.length === 0), variant: 'contained', color: 'primary', onClick: function () { return _this.handleNextStep(); } }, "Next")))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Step"], { key: 1 },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepLabel"], null, "Select Date and Blocks"),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepContent"], null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Select the date for the schedule change."),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'power-scheduler__date' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_6__["MuiPickersUtilsProvider"], { utils: _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__["default"] },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_6__["DatePicker"], { name: 'start', variant: 'inline', label: 'Start date', value: this.state.dateRange.start, onChange: function (date) { return _this.handleDatePickerSelect(date, 'start'); } }))),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'stepper-actions' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'text', onClick: function () { return _this.handlePreviousStep(); } }, "Back"),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'contained', color: 'primary', onClick: function () { return _this.handleNextStep(); } }, "Next")))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Step"], { key: 2 },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepLabel"], null, "Select scheduling type"),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepContent"], null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControl"], { component: 'fieldset' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], { component: 'legend' }, "Schedule classification"),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["RadioGroup"], { onChange: this.handleScheduleTypeChange },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControlLabel"], { value: 'appointment', label: 'Appointment', control: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Radio"], { color: 'primary', checked: this.state.scheduleType === 'appointment' }) }),
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControlLabel"], { value: 'amendment', label: 'Amendment', control: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Radio"], { color: 'primary', checked: this.state.scheduleType === 'amendment' }) }))),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { in: Boolean(this.state.scheduleType) },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Stepper"], { activeStep: this.state.subStep, orientation: 'vertical' },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Step"], { key: 0 },
                                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepLabel"], { StepIconComponent: SubStepIcon('A') }, "Select Staff"),
                                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepContent"], null,
                                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Select the staff member for the " + (this.state.scheduleType === 'amendment' ? 'Amendment' : 'Appointment') + "."),
                                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_11__["EnhancedTable"], { title: 'Staff', loading: this.state.loadingStaff, columns: staffTableColumns, data: staff, onSelect: this.handleSetStaffSelected, selected: this.state.selectedStaff, searchable: true, radio: true }),
                                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'stepper-actions' },
                                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'text', onClick: function () { return _this.handlePreviousStep(); } }, "Back"),
                                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { disabled: this.state.selectedStaff.length === 0, variant: 'contained', color: 'primary', onClick: function () { return _this.handleNextSubStep(); } }, "Next")))),
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Step"], { key: 1 },
                                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepLabel"], { StepIconComponent: SubStepIcon('B') }, "Schedule Memo"),
                                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepContent"], null,
                                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["TextField"], { variant: 'filled', label: 'Memo', placeholder: 'Schedule change purpose', margin: 'normal', fullWidth: true, multiline: true, value: this.state.memo, onChange: this.handleMemoChange }),
                                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FinalStepContent, { onPrevious: function () { return _this.handlePreviousSubStep(); } }))))),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { in: !Boolean(this.state.scheduleType) },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'stepper-actions' },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'text', onClick: function () { return _this.handlePreviousStep(); } }, "Back"))))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Step"], { key: 3, completed: this.state.step >= 3 },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepLabel"], null, "Done"),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["StepContent"], null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "All done! The schedule change has been processes successfully."),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'stepper-actions' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'contained', color: 'primary', onClick: function () { return _this.handleResetStep(); } }, "Create Another"))))))));
    };
    return CreatePowerSchedule;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component));
var mapDispatchToProps = { fetchStaff: _actions_staffActions__WEBPACK_IMPORTED_MODULE_8__["fetchStaff"], fetchStudents: _actions_studentActions__WEBPACK_IMPORTED_MODULE_9__["fetchStudents"], queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_7__["queueSnackbar"] };
var mapStateToProps = function (state) { return ({
    students: state.students.items,
    staff: state.staff.items
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(CreatePowerSchedule));


/***/ }),

/***/ "0q+F":
/*!**********************************************************!*\
  !*** ./resources/src/components/Table/EnhancedTable.tsx ***!
  \**********************************************************/
/*! exports provided: EnhancedTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnhancedTable", function() { return EnhancedTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../EmptyStateIcon */ "iea3");
/* harmony import */ var _EnhancedTableHead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EnhancedTableHead */ "XOpI");
/* harmony import */ var _EnhancedTableToolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EnhancedTableToolbar */ "19iQ");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var desc = function (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};
var stableSort = function (array, cmp) {
    var stabilizedThis = array.map(function (item, index) { return [item, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (item) { return item[0]; });
};
var getSorting = function (order, orderBy) {
    return order === 'desc' ? (function (a, b) { return desc(a, b, orderBy); }) : (function (a, b) { return -desc(a, b, orderBy); });
};
var EnhancedTable = /** @class */ (function (_super) {
    __extends(EnhancedTable, _super);
    function EnhancedTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tableQuery: '',
            order: 'asc',
            orderBy: _this.props.columns[0].id,
            page: 0,
            redirect: null,
            rowsPerPage: _this.props.defaultRowsPerPage || 5,
            filters: [],
            filtersDisabled: true,
            filterOpen: false,
        };
        _this.handleFilterOpen = function () {
            _this.setState({ filterOpen: true });
        };
        _this.handleFilterClose = function () {
            _this.setState({ filterOpen: false });
        };
        _this.handleFilterChange = function (filters, disabled) {
            _this.setState({
                filters: filters,
                filtersDisabled: disabled
            });
        };
        _this.isSelectable = function () {
            return Boolean(_this.props.onSelect);
        };
        _this.filterTableData = function () {
            var _a = _this.state, tableQuery = _a.tableQuery, filters = _a.filters;
            var properties = _this.props.columns.reduce(function (acc, column) {
                if (column.searchable) {
                    acc.push(column.id);
                }
                return acc;
            }, []);
            return _this.props.data.filter(function (row) {
                var enumFilters = filters.filter(function (filter) { return filter.type === 'enum'; });
                var otherFilters = filters.filter(function (filter) { return filter.type !== 'enum'; });
                var matchSearch = tableQuery.length > 0 ? (properties.some(function (property) {
                    return row[property] && new RegExp(tableQuery.toLowerCase(), 'g').test(row[property].toLowerCase());
                })) : true;
                var matchEnums = enumFilters.length && !_this.state.filtersDisabled ? (enumFilters.every(function (filter) {
                    return row[filter.id] === filter.value;
                })) : true;
                var matchFilters = otherFilters.length ? (otherFilters.some(function (filter) {
                    switch (filter.rule) {
                        case 'contains':
                            return row[filter.id].includes(filter.value);
                        case 'ends-with':
                            return row[filter.id].endsWith(filter.value);
                        case 'equal-to':
                            // tslint:disable-next-line: triple-equals
                            return row[filter.id] == filter.value;
                        case 'greater-than':
                            return row[filter.id] > filter.value;
                        case 'less-than':
                            return row[filter.id] < filter.value;
                        case 'not-equal-to':
                            // tslint:disable-next-line: triple-equals
                            return row[filter.id] != filter.value;
                        case 'starts-with':
                            return row[filter.id].startsWith(filter.value);
                    }
                })) : true;
                return matchSearch && matchFilters && matchEnums;
            });
        };
        _this.handleRequestSort = function (property) {
            var order = 'desc';
            if (_this.state.orderBy === property && _this.state.order === 'desc') {
                order = 'asc';
            }
            _this.setState({ order: order, orderBy: property });
        };
        _this.handleSelectAllClick = function (event) {
            if (!_this.props.onSelect) {
                return;
            }
            var newSelected = [];
            if (event.target.checked && _this.props.radio !== true) {
                newSelected = (_this.props.searchable && _this.state.tableQuery.length)
                    || (_this.state.filters.length && !_this.state.filtersDisabled) ? (_this.filterTableData().map(function (n) { return n.id; })) : (_this.props.data.map(function (n) { return n.id; }));
            }
            _this.props.onSelect(newSelected);
        };
        _this.handleInvertSelection = function () {
            if (!_this.isSelectable() || _this.props.radio) {
                return;
            }
            var newSelected = _this.props.data.map(function (n) { return n.id; }).filter(function (index) {
                return _this.props.selected.indexOf(index) < 0;
            });
            _this.props.onSelect(newSelected);
        };
        _this.handleClick = function (id) {
            if (!_this.isSelectable()) {
                return;
            }
            var newSelected = [];
            if (_this.props.radio) {
                newSelected = [id];
            }
            else {
                var selected = _this.props.selected;
                var selectedIndex = selected.indexOf(id);
                if (selectedIndex === -1) {
                    newSelected = newSelected.concat(selected, id);
                }
                else if (selectedIndex === 0) {
                    newSelected = newSelected.concat(selected.slice(1));
                }
                else if (selectedIndex > 0) {
                    newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
                }
            }
            _this.props.onSelect(newSelected);
        };
        _this.handleChangePage = function (event, page) {
            _this.setState({ page: page });
        };
        _this.handleChangeRowsPerPage = function (event) {
            _this.setState({ rowsPerPage: event.target.value });
        };
        _this.isSelected = function (id) {
            if (!_this.isSelectable()) {
                return false;
            }
            return _this.props.selected.indexOf(id) !== -1;
        };
        _this.handleTableQueryChange = function (value) {
            _this.setState({ tableQuery: value });
        };
        _this.skeletonRows = function () {
            var rows = [];
            for (var i = 0; i < _this.state.rowsPerPage; i++) {
                rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableRow"], { key: i },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { padding: 'checkbox' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { width: 24, height: 24, padding: 12 } },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 24, height: 24 },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: '0', y: '0', rx: '4', ry: '4', height: '24', width: '24' })))),
                    _this.props.columns.map(function (column) {
                        if (column.th) {
                            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { component: 'th', scope: 'row', padding: 'none', key: column.id },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { height: 24, width: 75 } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 75, height: 24 },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: '0', y: '0', rx: '4', ry: '4', width: '75', height: '8' })))));
                        }
                        else {
                            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { align: 'right', key: column.id },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { height: 24, width: 50, float: 'right' } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 50, height: 24 },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: '0', y: '0', rx: '4', ry: '4', width: '50', height: '8' }))));
                        }
                    })));
            }
            return rows;
        };
        return _this;
    }
    EnhancedTable.prototype.render = function () {
        var _this = this;
        if (this.state.redirect) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], { to: this.state.redirect });
        }
        var _a = this.state, order = _a.order, orderBy = _a.orderBy, rowsPerPage = _a.rowsPerPage, page = _a.page;
        var selected = this.props.selected;
        var numSelected = selected ? selected.length : 0;
        var selectable = this.isSelectable();
        var data = (this.props.searchable && this.state.tableQuery.length)
            || (this.state.filters.length && !this.state.filtersDisabled) ? (this.filterTableData()) : (this.props.data);
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'enhanced-table' }, this.props.data.length === 0 && !this.props.loading && this.props.showEmptyTable !== false ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'empty-state' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_4__["EmptyStateIcon"], { variant: 'file' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, (this.props.title ? this.props.title + " table" : 'Table') + " is empty.")))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Paper"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedTableToolbar__WEBPACK_IMPORTED_MODULE_6__["EnhancedTableToolbar"], { title: this.props.title, searchable: this.props.searchable, selectable: selectable, tableQuery: this.state.tableQuery, numSelected: numSelected, numShown: data.length, numTotal: this.props.data.length, columns: this.props.columns, actions: this.props.actions, filters: this.state.filters, filtersDisabled: this.state.filtersDisabled, handleInvertSelection: this.handleInvertSelection, handleFilterOpen: this.handleFilterOpen, handleFilterClose: this.handleFilterClose, handleFilterChange: this.handleFilterChange, handleTableQueryChange: this.handleTableQueryChange, filterOpen: this.state.filterOpen, loading: this.props.loading }, this.props.children),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Table"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedTableHead__WEBPACK_IMPORTED_MODULE_5__["EnhancedTableHead"], { columns: this.props.columns, link: this.props.link, loading: this.props.loading, numSelected: numSelected, order: order, orderBy: orderBy, onRequestSort: this.handleRequestSort, onSelectAllClick: this.handleSelectAllClick, radio: this.props.radio, rowCount: data.length, selectable: selectable }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableBody"], { className: 'enhanced-table__table-body' }, this.props.loading ? (this.skeletonRows()) : (stableSort(data, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (n) {
                        var isSelected = _this.isSelected(n.id);
                        var columns = _this.props.columns.filter(function (column) {
                            return column.visible;
                        });
                        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableRow"], { hover: true, onClick: function () { return _this.handleClick(n.id); }, role: selectable ? 'checkbox' : null, "aria-checked": isSelected, tabIndex: -1, key: n.id, selected: isSelected },
                            selectable && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { padding: 'checkbox' }, _this.props.radio ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Radio"], { checked: isSelected, color: 'primary' })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Checkbox"], { checked: isSelected, color: 'primary' })))),
                            columns.map(function (column, index) {
                                var columnData = n[column.id];
                                if (column.th) {
                                    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { component: 'th', scope: 'row', padding: selectable || index !== 0 ? 'none' : 'default', key: column.id }, _this.props.link && !selectable ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { className: 'enhanced-table__link', to: _this.props.link.path + "/" + n[_this.props.link.key] }, columnData)) : columnData));
                                }
                                else {
                                    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { align: 'right', key: column.id }, columnData);
                                }
                            }),
                            (_this.props.link && selectable) && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TableCell"], { padding: 'checkbox', align: 'center' },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: _this.props.link.label, placement: 'left' },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: _this.props.link.path + "/" + n[_this.props.link.key] },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "launch")))))));
                    }))))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TablePagination"], { rowsPerPageOptions: [5, 10, 25], component: 'div', count: data.length, rowsPerPage: rowsPerPage, page: page, backIconButtonProps: {
                    'aria-label': 'Previous Page'
                }, nextIconButtonProps: {
                    'aria-label': 'Next Page'
                }, onChangePage: this.handleChangePage, onChangeRowsPerPage: this.handleChangeRowsPerPage })))));
    };
    return EnhancedTable;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));



/***/ }),

/***/ "19iQ":
/*!*****************************************************************!*\
  !*** ./resources/src/components/Table/EnhancedTableToolbar.tsx ***!
  \*****************************************************************/
/*! exports provided: EnhancedTableToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnhancedTableToolbar", function() { return EnhancedTableToolbar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _EnhancedTableFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EnhancedTableFilter */ "Ysj4");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var EnhancedTableToolbar = /** @class */ (function (_super) {
    __extends(EnhancedTableToolbar, _super);
    function EnhancedTableToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            searchOpen: false,
            menuRef: null
        };
        _this.handleMenuOpen = function (event) {
            _this.setState({ menuRef: event.currentTarget });
        };
        _this.handleMenuClose = function () {
            _this.setState({ menuRef: null });
        };
        _this.handleOpenSearch = function () {
            _this.setState({ searchOpen: true }, function () {
                _this.searchInput.focus();
            });
        };
        _this.handleCloseSearch = function () {
            _this.setState({ searchOpen: false }, function () {
                _this.props.handleTableQueryChange('');
            });
        };
        _this.handleInvertSelection = function () {
            _this.props.handleInvertSelection();
            _this.handleMenuClose();
        };
        _this.handleActionSelect = function (action) {
            action.callback();
            _this.handleMenuClose();
        };
        _this.handleTableQueryChange = function (event) {
            if (event.keyCode === 27) {
                _this.handleCloseSearch();
                return;
            }
            _this.props.handleTableQueryChange(event.target.value);
        };
        return _this;
    }
    EnhancedTableToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, numSelected = _a.numSelected, numShown = _a.numShown, numTotal = _a.numTotal, filterOpen = _a.filterOpen;
        var menuRef = this.state.menuRef;
        var menuOpen = Boolean(menuRef);
        var headerString;
        if (numSelected > 0 || (numTotal > 0 && numShown < numTotal)) {
            if (numSelected > 0 && (numTotal > 0 && numShown < numTotal)) {
                headerString = "Showing " + numShown + " of " + numTotal + ", " + numSelected + " selected";
            }
            else if (numSelected > 0) {
                headerString = numSelected + " selected";
            }
            else {
                headerString = "Showing " + numShown + " of " + numTotal;
            }
        }
        else {
            headerString = this.props.title;
        }
        var loadingButton = function () { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { height: 48, width: 160 } },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { width: 160, height: 48, preserveAspectRatio: 'none' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", { cx: '24', cy: '24', r: '24' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", { cx: '80', cy: '24', r: '24' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", { cx: '136', cy: '24', r: '24' })))); };
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Toolbar"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'enhanced-table__toolbar' },
                headerString && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], { variant: 'h6', className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
                        'num-selected': numSelected > 0 || (numTotal > 0 && numShown < numTotal)
                    }) }, headerString)),
                filterOpen && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedTableFilter__WEBPACK_IMPORTED_MODULE_4__["EnhancedTableFilter"], { filters: this.props.filters, disabled: this.props.filtersDisabled, open: filterOpen, handleFilterChange: this.props.handleFilterChange, columns: this.props.columns.filter(function (column) {
                        return column.filterable;
                    }), handleFilterClose: this.props.handleFilterClose })),
                this.props.loading ? (loadingButton()) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", { className: 'enhanced-table__tools' },
                    this.props.searchable && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Grow"], { in: this.state.searchOpen },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TextField"], { className: 'enhanced-table__search', onChange: this.handleTableQueryChange, placeholder: "Search " + this.props.title, value: this.props.tableQuery, variant: 'standard', margin: 'none', autoFocus: true, inputRef: function (input) {
                                        _this.searchInput = input;
                                    } }))),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, this.state.searchOpen ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Close Search' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: function () { return _this.handleCloseSearch(); } },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "close")))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Search' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: function () { return _this.handleOpenSearch(); } },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "search"))))))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Filter' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: this.props.handleFilterOpen },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Badge"], { invisible: this.props.filters.length === 0 || this.props.filtersDisabled, color: 'secondary', variant: 'dot' },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "filter_list"))))),
                    this.props.selectable && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: this.handleMenuOpen },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "more_vert")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Menu"], { open: menuOpen, anchorEl: menuRef, onClose: this.handleMenuClose },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["MenuItem"], { onClick: function () { return _this.handleInvertSelection(); } }, "Invert selection"),
                            (this.props.numSelected > 0 && this.props.actions && this.props.actions.length) && (this.props.actions.map(function (action) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["MenuItem"], { key: action.id, onClick: function () { return _this.handleActionSelect(action); } }, action.name)); }))))),
                    this.props.children)))));
    };
    return EnhancedTableToolbar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));



/***/ }),

/***/ "1dtU":
/*!************************************************!*\
  !*** ./resources/src/reducers/usersReducer.ts ***!
  \************************************************/
/*! exports provided: usersReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usersReducer", function() { return usersReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: []
};
var usersReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_USERS"]:
            return __assign({}, state, { items: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "1o1L":
/*!**************************************************!*\
  !*** ./resources/src/reducers/studentReducer.ts ***!
  \**************************************************/
/*! exports provided: studentReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "studentReducer", function() { return studentReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: [],
    item: null
};
var studentReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STUDENTS"]:
            return __assign({}, state, { items: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["NEW_STUDENT"]:
            return {
                items: state.items.concat([action.payload]),
                item: action.payload
            };
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["DELETE_STUDENT"]:
            return __assign({}, state, { items: state.items.filter(function (item) { return item.id !== action.payload; }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_STUDENT"]:
            return __assign({}, state, { items: state.items.filter(function (item) { return item.id !== action.payload.id; }).concat([
                    action.payload
                ]) });
        default:
            return state;
    }
};


/***/ }),

/***/ "292G":
/*!****************************************************************!*\
  !*** ./resources/src/components/Reporting/ReportNameModal.tsx ***!
  \****************************************************************/
/*! exports provided: ReportNameModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportNameModal", function() { return ReportNameModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var ReportNameModal = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null), name = _a[0], setName = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null), error = _b[0], setError = _b[1];
    var handleSubmit = function () {
        // Validate input
        var nameLength = name ? name.length : props.name.length || 0;
        if (nameLength < 3) {
            setError('Please choose a name that is at least 3 characters long.');
        }
        else {
            props.onSubmit(name || props.name);
        }
    };
    var onChange = function (event) {
        setName(event.target.value);
        setError(null);
    };
    var onExited = function () {
        setName(null);
        setError(null);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open, onExited: onExited },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, "Report Name"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, "Choose a name to give to the Report."),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { onChange: onChange, value: name || props.name, label: 'Report Name', placeholder: 'My Report', variant: 'outlined', fullWidth: true, error: !!error, helperText: error || undefined })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', color: 'primary', onClick: function () { return handleSubmit(); } }, "Submit"))));
};



/***/ }),

/***/ "2Cd6":
/*!***********************************************************!*\
  !*** ./resources/src/components/Form/LoadingMenuItem.tsx ***!
  \***********************************************************/
/*! exports provided: LoadingMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingMenuItem", function() { return LoadingMenuItem; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



var LoadingMenuItem = function (props) {
    var _a;
    var disabled = props.disabled, loading = props.loading, button = props.button, rest = __rest(props, ["disabled", "loading", "button"]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('menu-item-container', (_a = {}, _a['--loading'] = props.loading, _a)) },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], __assign({}, rest, { disabled: disabled || loading })),
        loading && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], { size: 24, className: 'menu-item-progress' }))));
};


/***/ }),

/***/ "2bo5":
/*!**************************************!*\
  !*** ./resources/src/utils/utils.ts ***!
  \**************************************/
/*! exports provided: listToTruncatedString, isEmpty, isArray, makeArray, getMethodDetailsFromName, getCurrentTimestamp, downloadCsv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listToTruncatedString", function() { return listToTruncatedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeArray", function() { return makeArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMethodDetailsFromName", function() { return getMethodDetailsFromName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTimestamp", function() { return getCurrentTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadCsv", function() { return downloadCsv; });
/**
 *
 * @param list A list of string items to truncate
 * @param objectName The kind of objects in the list
 * Example input: (['Red', 'Green', 'Blue'], 'Group')
 * Example output: 'Red, Green and 1 other Group'
 */
var listToTruncatedString = function (list, objectName) {
    if (list.length === 0) {
        return objectName ? "No " + objectName + "s" : 'None';
    }
    else {
        if (list.length === 1) {
            return list[0];
        }
        else if (list.length === 2) {
            return list[0] + " and " + list[1];
        }
        else if (list.length === 3) {
            return list[0] + " and 2 other" + (objectName ? " " + objectName + "s" : 's');
        }
        else {
            return list[0] + ", " + list[1] + " and " + (list.length - 2) + " other" + (objectName ? " " + objectName + "s" : 's');
        }
    }
};
/**
 * Determines whether or not an Object is empty.
 * @param obj The object.
 * @return `true` if the object is empty, `false` otherwise.
 */
var isEmpty = function (obj) {
    if (!obj) {
        return true;
    }
    else {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
};
/**
 * Determines whether an object is an array.
 * @param object The object.
 * @return `true` if the object is an array.
 */
var isArray = function (object) {
    return Array.isArray(object);
};
/**
 * Creates an array from an object. If the given object is already an array,
 * the original array is returned.
 * @param object The object or array
 * @return An array containing either the object, or all original array entries
 */
var makeArray = function (object) {
    if (!object) {
        return [];
    }
    else {
        return isArray(object) ? object : [object];
    }
};
/**
 *
 */
var getMethodDetailsFromName = function (method) {
    switch (method) {
        case 'manual':
            return {
                icon: 'keyboard',
                title: 'Via manual check-in',
            };
        case 'air':
            return {
                icon: 'wifi',
                title: 'Via Air Check-in',
            };
        case 'roll-call':
            return {
                icon: 'assignment',
                title: 'Via roll call',
            };
        case 'amendment':
            return {
                icon: 'assignment_turned_in',
                title: 'Amended',
            };
        case 'proactive':
            return {
                icon: 'access_time',
                title: 'Proactive check-in'
            };
        case 'retroactive':
            return {
                icon: 'access_time',
                title: 'Retroactive check-in'
            };
    }
};
/**
 * Determines the user's local time and returns it as a string.
 * @return The local timestamp
 */
var getCurrentTimestamp = function () {
    var now = new Date();
    return now.toLocaleDateString() + " " + now.toLocaleTimeString();
};
/**
 * Downloads a CSV file given a 2D array of rows.
 * @param rows The CSV rows to download.
 * @param filename The CSV's filename, without the CSV extension (optional).
 */
var downloadCsv = function (rows, filename) {
    var csvContent = 'data:text/csv;charset=utf-8,'
        + rows.map(function (row) { return row.join(','); }).join('\n');
    var encodedUri = encodeURI(csvContent);
    if (filename) {
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename + ".csv");
        document.body.appendChild(link);
        // Download the CSV file with the given filename
        link.click();
    }
    else {
        window.open(encodedUri);
    }
};


/***/ }),

/***/ "3Uil":
/*!*************************************!*\
  !*** ./resources/src/utils/date.ts ***!
  \*************************************/
/*! exports provided: DATE_SEGMENT_LABELS, PREDEFINED_LABELS, normalizeDateRange, dateRangeToString, formatDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_SEGMENT_LABELS", function() { return DATE_SEGMENT_LABELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREDEFINED_LABELS", function() { return PREDEFINED_LABELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeDateRange", function() { return normalizeDateRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRangeToString", function() { return dateRangeToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "b/SL");

// import { endOfMonth, startOfWeek, subWeeks, startOfMonth, subMonths, , startOfYear } from 'date-fns/esm'
var DATE_SEGMENT_LABELS = {
    block: ['Block', 'Blocks'],
    day: ['Day', 'Days'],
    week: ['Week', 'Weeks'],
    month: ['Month', 'Months']
};
var PREDEFINED_LABELS = {
    'all-time': 'All Time',
    'last-14-days': 'Last 14 Days',
    'last-2-days': 'Last 2 Days',
    'last-24-hours': 'Last 24 Hours',
    'last-30-days': 'Last 30 Days',
    'last-7-days': 'Last 7 Days',
    'last-hour': 'Last Hour',
    'last-month': 'Last Month',
    'last-week': 'Last Week',
    'this-month': 'This Month',
    'this-week': 'This Week',
    'today': 'Today',
    'yesterday': 'Yesterday'
};
var normalizeDateRange = function (dateRange) {
    var normalizedDateRange = { type: 'absolute', start: new Date(), end: new Date() };
    switch (dateRange.type) {
        case 'absolute':
            return dateRange;
        case 'relative':
            return normalizedDateRange;
        case 'predefined':
            var start = new Date();
            var end = new Date();
            switch (dateRange.range) {
                case 'last-hour':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subHours"])(new Date(), 1);
                    break;
                case 'today':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])();
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfToday"])();
                    break;
                case 'yesterday':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfYesterday"])();
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'last-2-days':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subDays"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 2);
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'last-7-days':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subDays"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 7);
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'last-14-days':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subDays"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 14);
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'last-30-days':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subDays"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 30);
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'this-week':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfWeek"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])()),
                        end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'last-week':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfWeek"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subWeeks"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 1));
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfWeek"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subWeeks"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfToday"])(), 1));
                    break;
                case 'this-month':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfMonth"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])());
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfYesterday"])();
                    break;
                case 'last-month':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfMonth"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subMonths"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 1));
                    end = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfMonth"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subMonths"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfToday"])(), 1));
                    break;
                case 'all-time':
                    start = Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfYear"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["subYears"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfToday"])(), 1));
                    break;
            }
            return { type: 'absolute', start: start, end: end };
    }
};
var dateRangeToString = function (dateRange) {
    switch (dateRange.type) {
        case 'absolute':
            return formatDate(dateRange.start) + " - " + formatDate(dateRange.end);
        case 'relative':
            var dateSegmentLabel = DATE_SEGMENT_LABELS[dateRange.segment];
            return "Past " + dateRange.value + " " + dateSegmentLabel[dateRange.value === 1 ? 0 : 1];
        case 'predefined':
            return PREDEFINED_LABELS[dateRange.range];
    }
};
var formatDate = function (date) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};


/***/ }),

/***/ "3a2C":
/*!************************************************************!*\
  !*** ./resources/src/components/Sidebar/StarredWidget.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_starActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/starActions */ "BHus");
/* harmony import */ var _reducers_starReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../reducers/starReducer */ "8Jk3");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../EmptyStateIcon */ "iea3");
/* harmony import */ var _Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Sidebar/NavItem */ "LBOG");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();










var IStarredWidget = /** @class */ (function (_super) {
    __extends(IStarredWidget, _super);
    function IStarredWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: false,
            loading: false
        };
        _this.fetchStarred = function () {
            _this.setState({ loading: true });
            _this.props.fetchStarred().then(function (res) { return _this.setState({ loading: false }); });
        };
        _this.handleClickOpen = function () {
            _this.setState({ open: true });
            _this.fetchStarred();
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        _this.toggleIStarred = function (event, starredItem) {
            event.preventDefault();
            event.stopPropagation();
            var isStarred = starredItem.isStarred !== false;
            if (isStarred) {
                _this.props.unstarItem(starredItem);
            }
            else {
                _this.props.starItem(starredItem);
            }
        };
        _this.escFunction = function (event) {
            if (event.keyCode === 27) {
                _this.setState({ open: false });
            }
        };
        _this.escFunction = _this.escFunction.bind(_this);
        return _this;
    }
    IStarredWidget.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.escFunction, false);
        this.fetchStarred();
    };
    IStarredWidget.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.escFunction, false);
    };
    IStarredWidget.prototype.render = function () {
        var _this = this;
        var starredCount = this.props.starred.length;
        var starred = {};
        if (this.props.starred) {
            this.props.starred.forEach(function (starredItem) {
                if (starred[starredItem.item_type]) {
                    starred[starredItem.item_type].unshift(starredItem);
                }
                else {
                    starred[starredItem.item_type] = [starredItem];
                }
            });
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_9__["NavItem"], { title: 'Starred', icon: 'star', onClick: this.handleClickOpen }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Drawer"], { open: this.state.open },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal starred_modal items_modal' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal__header' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["IconButton"], { className: 'button_back', onClick: this.handleClose },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Icon"], null, "arrow_back")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Starred")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal__content starred_modal__content items_modal__content' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grow"], { in: !this.state.loading && starredCount > 0, timeout: { enter: 200, exit: 0 } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'content-inner' }, _reducers_starReducer__WEBPACK_IMPORTED_MODULE_7__["starredGroups"].filter(function (starredGroup) { return starred[starredGroup.value]; })
                                .map(function (starredGroup, groupIndex) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { key: groupIndex },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", { className: 'items-group_header' }, starredGroup.label),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["List"], { className: 'items-group_list' }, starred[starredGroup.value]
                                    .map(function (starredItem, itemIndex) {
                                    var url;
                                    var isStarred = starredItem.isStarred === false ? false : true;
                                    switch (starredGroup.value) {
                                        case 'student':
                                            url = "/students/" + starredItem.item_id;
                                            break;
                                        case 'staff':
                                            url = "/staff/" + starredItem.item_id;
                                            break;
                                        case 'course':
                                            url = "/courses/" + starredItem.item_id;
                                            break;
                                        case 'report':
                                            url = "/reporting/" + starredItem.item_id;
                                            break;
                                        case 'cluster':
                                            url = "/clusters/" + starredItem.item_id;
                                            break;
                                    }
                                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], { key: itemIndex, to: url, onClick: _this.handleClose },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["ListItem"], { className: 'items-group_list__item' },
                                            starredItem.label,
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["ListItemSecondaryAction"], { className: 'star' },
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["IconButton"], { onClick: function (event) { return _this.toggleIStarred(event, starredItem); } },
                                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Icon"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()({ '--starred': isStarred }) }, isStarred ? 'star' : 'star_border'))))));
                                })))); }))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Fade"], { in: this.state.loading, timeout: { enter: 200, exit: 0 } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'items_modal__content-loader' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { width: 500, height: 436 },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '0', rx: '4', ry: '4', height: '24', width: '96' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '40', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '84', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '128', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '180', rx: '4', ry: '4', height: '24', width: '160' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '220', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '264', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '308', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '360', rx: '4', ry: '4', height: '24', width: '80' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '400', rx: '4', ry: '4', height: '36', width: '400' })))),
                        !this.state.loading && starredCount === 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_8__["EmptyStateIcon"], { variant: 'starred' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Your Starred list is empty"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Items you add to your Starred list will appear here."))))))));
    };
    return IStarredWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    starred: state.starred.items,
    newIStarred: state.starred.item
}); };
var mapDispatchToProps = {
    fetchStarred: _actions_starActions__WEBPACK_IMPORTED_MODULE_6__["fetchStarred"],
    starItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_6__["starItem"],
    unstarItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_6__["unstarItem"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(IStarredWidget));


/***/ }),

/***/ "3k4I":
/*!*************************************************!*\
  !*** ./resources/src/components/ChipSelect.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form/LoadingIconButton */ "x2q7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var ChipSelect = /** @class */ (function (_super) {
    __extends(ChipSelect, _super);
    function ChipSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            inputValue: '',
            resultsRef: null
        };
        _this.handleInputChange = function (event) {
            var inputValue = event.target.value;
            var searchable = Boolean(_this.props.onSearch);
            _this.setState({ inputValue: inputValue });
            if (searchable) {
                _this.props.onSearch(inputValue);
            }
        };
        _this.handleInputFocus = function (event) {
            if (_this.props.onSearch) {
                _this.setState({ resultsRef: event.currentTarget });
            }
        };
        _this.onKeyDown = function (event) {
            if (_this.props.disabled) {
                return;
            }
            if ([188, 13, 32].includes(event.keyCode)) { // Comma, Enter, Space
                event.preventDefault();
                if (_this.state.inputValue.length > 0) {
                    _this.handleCreateChip();
                }
            }
        };
        _this.onPaste = function (event) {
            event.preventDefault();
            var clipboard = event.clipboardData.getData('Text');
            _this.setState({ inputValue: clipboard }, function () {
                clipboard.split(',').forEach(function (stringValue) {
                    _this.handleCreateChip({ value: null, label: stringValue });
                });
            });
        };
        _this.handleSubmit = function () {
            if (_this.props.chips.length === 0 && _this.state.inputValue.length === 0) {
                return;
            }
            _this.props.onSubmit();
        };
        _this.handleCreateChip = function (chip) {
            if (!chip) {
                if (_this.state.inputValue.length === 0) {
                    return;
                }
                chip = { value: null, label: _this.state.inputValue };
                _this.setState({ inputValue: '' });
            }
            var label = chip.label;
            if (_this.props.disabled || !_this.props.onCreateChip) {
                return;
            }
            if (label === null) {
                label = _this.state.inputValue;
            }
            var newChip = {
                avatar: chip.avatar,
                value: chip.value,
                loading: _this.props.loadNewChips,
                label: _this.props.formatChipLabel ? _this.props.formatChipLabel(label) : label
            };
            _this.props.onCreateChip(newChip);
        };
        _this.handleRemoveChip = function (index, onRemove) {
            console.log('ChipSelect::handleRemoveChip()');
            if (_this.props.disabled) {
                return;
            }
            _this.props.onRemoveChip(index);
            if (onRemove) {
                onRemove();
            }
        };
        _this.handleCloseResults = function () {
            _this.setState({ resultsRef: null });
        };
        _this.handleSelectQueryResult = function (item) {
            _this.handleCreateChip({
                avatar: item.avatar,
                value: item.value,
                label: item.label
            });
            if (_this.props.onSelect) {
                _this.props.onSelect(item);
            }
        };
        return _this;
    }
    ChipSelect.prototype.render = function () {
        var _this = this;
        var searchable = Boolean(this.props.onSearch);
        var disabled = this.props.disabled || this.props.loading;
        var createDisabled = disabled || this.state.inputValue.length === 0;
        var resultsOpen = !disabled && searchable && Boolean(this.state.resultsRef) && this.state.inputValue.length > 0;
        var hasChips = this.props.chips.length > 0;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ClickAwayListener"], { onClickAway: this.handleCloseResults },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'chip_select' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'chip_select__textfield' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'chip_select__actions' },
                            this.props.onSearch && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "search"))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputBase"], { className: 'chip_select__input', value: this.state.inputValue, onChange: this.handleInputChange, onFocus: this.handleInputFocus, placeholder: this.props.placeholder, disabled: disabled, onKeyDown: this.onKeyDown, onPaste: this.onPaste, autoFocus: true }),
                            searchable || !this.props.onCreateChip ? (this.props.loading && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'chip_select__loading' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], { size: 24 })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Add (Enter)' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_3__["LoadingIconButton"], { loading: this.props.loading, disabled: createDisabled, onClick: function () { return _this.handleCreateChip(); } },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "keyboard_return"))))))),
                this.props.helperText && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormHelperText"], null, this.props.helperText)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Collapse"], { in: hasChips },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('chips_container', { '--has_chips': hasChips }) }, this.props.chips.map(function (chip, index) {
                        var _a;
                        var isDuplicate = false;
                        var avatar = chip.avatar ? (chip.loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Avatar"], null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], { size: 24 }))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('chip_avatar', (_a = {}, _a["--" + chip.avatar.color] = chip.avatar.color, _a)) }, chip.avatar.initials))) : undefined;
                        var chipComponent = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()({ '--duplicate': isDuplicate }), key: index, avatar: avatar, label: chip.label, onDelete: function () { return _this.handleRemoveChip(index, chip.onRemove); } }));
                        return chip.title ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { placement: 'bottom-start', key: index, title: chip.title }, chipComponent) : chipComponent;
                    }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Popper"], { className: 'chip_select__popper', anchorEl: this.state.resultsRef, open: resultsOpen, disablePortal: true, transition: true, placement: 'bottom' }, function (_a) {
                    var TransitionProps = _a.TransitionProps;
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grow"], __assign({}, TransitionProps),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuList"], null, _this.props.queryResults.length > 0 ? (_this.props.queryResults.map(function (queryResult, index) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { selected: queryResult.selected, key: index, onClick: function () { return _this.handleSelectQueryResult(queryResult); } },
                                queryResult.avatar && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('chip_avatar', "--" + queryResult.avatar.color) }, queryResult.avatar.initials)),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, queryResult.label))); })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { className: 'no_results' }, "No results found."))))));
                }))));
    };
    return ChipSelect;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (ChipSelect);


/***/ }),

/***/ "3l0q":
/*!***************************************************!*\
  !*** ./resources/src/components/ModalSection.tsx ***!
  \***************************************************/
/*! exports provided: ModalSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalSection", function() { return ModalSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var ModalSection = function (props) {
    var badgeCount = props.badgeCount || 0;
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(true), open = _a[0], setOpen = _a[1];
    var isOpen = props.open !== false && (props.open || open);
    var handleHeaderClick = function () {
        if (props.collapsible === false) {
            return;
        }
        if (open && props.onClose) {
            props.onClose();
        }
        else if (!open && props.onOpen) {
            props.onOpen();
        }
        setOpen(!open);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'modal-section' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'modal-section__header' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Badge"], { badgeContent: badgeCount, invisible: badgeCount === 0, color: 'primary' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', color: 'inherit', onClick: handleHeaderClick, className: 'modal-section__button' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], null, props.icon),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { className: 'button_text' }, props.title),
                    props.collapsible !== false && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], null, isOpen ? 'expand_more' : 'expand_less')))),
            props.labelAdornment),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Collapse"], { className: 'modal-section__content', in: isOpen }, props.count === 0 ? (props.emptyState) : (props.children))));
};


/***/ }),

/***/ "4XmI":
/*!*****************************************************************!*\
  !*** ./resources/src/components/Reporting/ReportNameWidget.tsx ***!
  \*****************************************************************/
/*! exports provided: ReportNameWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportNameWidget", function() { return ReportNameWidget; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var INPUT_PLACEHOLDER = 'Report Name';
var ReportNameWidget = /** @class */ (function (_super) {
    __extends(ReportNameWidget, _super);
    function ReportNameWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editing: false,
            hiddenInputWidth: 0,
            name: _this.props.name,
            tooShort: false
        };
        /*
            constructor(props: IProps) {
                super(props)
                // this.hiddenInputRef = React.createRef()
            }
        */
        _this.handleEsc = function (event) {
            if (event.keyCode === 27) {
                _this.setState({ editing: false });
            }
        };
        _this.handleChange = function (event) {
            _this.setState({
                name: event.target.value,
                tooShort: false
            }, function () {
                _this.setState({ hiddenInputWidth: _this.hiddenInputRef.clientWidth });
            });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            var submittedName = _this.state.name.trim();
            if (submittedName.length < 3) {
                _this.setState({ tooShort: true });
                return;
            }
            _this.setState({ editing: false });
            _this.props.onSubmit(submittedName);
        };
        _this.handleClickAway = function (event) {
            if (_this.state.editing) {
                _this.handleSubmit(event);
            }
        };
        _this.handleEdit = function () {
            _this.setState({
                editing: true,
                tooShort: false,
                name: _this.props.name,
            }, function () {
                _this.setState({ hiddenInputWidth: _this.hiddenInputRef.clientWidth });
            });
        };
        return _this;
    }
    ReportNameWidget.prototype.componentDidMount = function () {
        // Add event listener for escape key press
        document.addEventListener('keydown', this.handleEsc, false);
    };
    ReportNameWidget.prototype.componentWillMount = function () {
        document.removeEventListener('keydown', this.handleEsc, false);
    };
    ReportNameWidget.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('report_name_widget', { '--edit': this.state.editing, '--error': this.state.tooShort }) }, this.state.editing ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ClickAwayListener"], { onClickAway: this.handleClickAway },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h4' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'report_name_widget__hidden', ref: function (element) { return _this.hiddenInputRef = element; } }, this.state.name.length > 0 ? this.state.name : INPUT_PLACEHOLDER),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { onSubmit: this.handleSubmit },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", { value: this.state.name, onChange: this.handleChange, className: 'report_name_widget__input', style: { width: this.state.hiddenInputWidth }, autoFocus: true, placeholder: INPUT_PLACEHOLDER }),
                    this.state.tooShort && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormHelperText"], { className: 'report_name_widget__helper' }, "Report name must be at least 3 characters long.")))))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Rename Report' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardActionArea"], { onClick: function () { return _this.handleEdit(); } },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h4' }, this.props.name))))));
    };
    return ReportNameWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "60lH":
/*!*********************************************************!*\
  !*** ./resources/src/actions/studentScheduleActions.ts ***!
  \*********************************************************/
/*! exports provided: createAppointment, deleteAppointment, fetchStudentSchedule, fetchStaffList, setStudentPlan, createAmendment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAppointment", function() { return createAppointment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAppointment", function() { return deleteAppointment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStudentSchedule", function() { return fetchStudentSchedule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStaffList", function() { return fetchStaffList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStudentPlan", function() { return setStudentPlan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAmendment", function() { return createAmendment; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "xkie");


var createAppointment = function (appointment) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/appointments/create', appointment)
        .then(function (res) {
        return res.data;
    });
};
var deleteAppointment = function (appointmentID) {
    var url = "/api/appointments/" + appointmentID;
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(url)
        .then(function (res) {
        return res.data;
    });
};
var fetchStudentSchedule = function (studentID, dateTime) {
    var baseURL;
    if (studentID) {
        baseURL = "/api/students/" + studentID + "/schedule";
    }
    else {
        baseURL = '/api/students/self/schedule';
    }
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("" + baseURL + (dateTime ? "/" + dateTime : ''))
            .then(function (res) {
            var schedule = res.data;
            dispatch({
                type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STUDENT_SCHEDULE"],
                payload: schedule
            });
        });
    };
};
var fetchStaffList = function (blockID, dateTime) {
    var data = {
        block_id: blockID,
        date: dateTime
    };
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/students/staff-list', data)
            .then(function (res) {
            var staffTopics = res.data;
            dispatch({
                type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STAFF_LIST"],
                payload: staffTopics
            });
        });
    };
};
var setStudentPlan = function (schedulePlan) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/students/schedule-plan', schedulePlan)
            .then(function (res) {
            return res.data;
        });
    };
};
var createAmendment = function (amendment) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/amendment', amendment)
            .then(function (res) {
            return res.data;
        });
    };
};


/***/ }),

/***/ "6n2l":
/*!********************************************************!*\
  !*** ./resources/src/components/Modals/PlanWidget.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/studentScheduleActions */ "60lH");
/* harmony import */ var _Calendar_CalendarDialogItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Calendar/CalendarDialogItem */ "Kpek");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EnhancedDialogTitle */ "ePNl");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var PlanWidget = /** @class */ (function (_super) {
    __extends(PlanWidget, _super);
    function PlanWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingStaffList: false,
            open: false,
            uploading: false
        };
        _this.handleOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        _this.handleSubmit = function (staffTopic) {
            _this.setState({
                open: false,
                uploading: true
            });
            var schedulePlan = {
                staff_id: staffTopic.staff.id,
                block_id: _this.props.blockDetails.block_id,
                date: _this.props.blockDetails.date
            };
            _this.props.setStudentPlan(schedulePlan)
                .then(function () {
                // Signal to refresh profile
                return _this.props.onSubmit()
                    .then(function () {
                    // this.props.onClose()
                    _this.setState({
                        uploading: false
                    });
                });
            });
        };
        return _this;
    }
    PlanWidget.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props.blockDetails, block_id = _a.block_id, date = _a.date;
        this.setState({ loadingStaffList: true });
        this.props.fetchStaffList(block_id, date)
            .then(function () {
            _this.setState({ loadingStaffList: false });
        });
    };
    PlanWidget.prototype.render = function () {
        var _this = this;
        var disabled = this.props.blockDetails.data.appointments && this.props.blockDetails.data.appointments.length;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__["LoadingButton"], { loading: this.state.uploading, variant: 'text', color: 'primary', onClick: function () { return _this.handleOpen(); }, disabled: disabled }, "Set Plan"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: this.state.open },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__["EnhancedDialogTitle"], { title: 'Plan Schedule', onClose: this.handleClose }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, "Select a teacher from the list below."),
                    this.state.loadingStaffList ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], null)) : (this.props.staffList.map(function (staffTopic, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calendar_CalendarDialogItem__WEBPACK_IMPORTED_MODULE_4__["CalendarDialogItem"], { onCloseDialog: _this.handleClose, onClick: function () { return _this.handleSubmit(staffTopic); }, details: {
                            variant: staffTopic.topic ? staffTopic.topic.color : undefined,
                            title: staffTopic.staff.name,
                            memo: staffTopic.topic ? staffTopic.topic.memo : 'No Topic',
                            time: staffTopic.num_remaining + " of " + staffTopic.staff.capacity + " remaining"
                        }, disabled: staffTopic.num_remaining === 0, unavailable: staffTopic.topic && staffTopic.topic.unavailable, key: index })); }))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return _this.handleClose(); } }, "Cancel")))));
    };
    return PlanWidget;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    staffList: state.staffTopics.items
}); };
var mapDispatchToProps = { fetchStaffList: _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_3__["fetchStaffList"], setStudentPlan: _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_3__["setStudentPlan"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PlanWidget));


/***/ }),

/***/ "7iUc":
/*!*********************************************!*\
  !*** ./resources/src/components/Drawer.tsx ***!
  \*********************************************/
/*! exports provided: Drawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drawer", function() { return Drawer; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");



var Drawer = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('drawer', { '--open': props.open }) },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'drawer__topbar' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h6' }, props.title)),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'drawer__content' }, props.children)));
};



/***/ }),

/***/ "80mo":
/*!***********************************************!*\
  !*** ./resources/src/reducers/authReducer.ts ***!
  \***********************************************/
/*! exports provided: authReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authReducer", function() { return authReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");

var initialState = {
    isAuthenticated: false,
    user: null
};
var authReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENT_USER"]:
            return {
                isAuthenticated: Boolean(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
};


/***/ }),

/***/ "8Jk3":
/*!***********************************************!*\
  !*** ./resources/src/reducers/starReducer.ts ***!
  \***********************************************/
/*! exports provided: starredGroups, emptyStarred, starReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "starredGroups", function() { return starredGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyStarred", function() { return emptyStarred; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "starReducer", function() { return starReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var starredGroups = [
    { value: 'student', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'report', label: 'Reports' },
    { value: 'course', label: 'Courses' },
    { value: 'cluster', label: 'Clusters' },
];
var emptyStarred = {
    student: [],
    staff: [],
    course: [],
    cluster: [],
};
var initialState = {
    items: [],
    item: null
};
var starReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STARRED"]:
            return __assign({}, state, { items: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["STAR_ITEM"]:
            return __assign({}, state, { items: state.items.reduce(function (arr, item) {
                    arr.push(item.id === action.payload.id ? __assign({}, item, { isStarred: true }) : item);
                    return arr;
                }, []), item: __assign({}, action.payload, { isStarred: true }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UNSTAR_ITEM"]:
            return __assign({}, state, { items: state.items.reduce(function (arr, item) {
                    arr.push(item.id === action.payload.id ? __assign({}, item, { isStarred: false }) : item);
                    return arr;
                }, []), item: __assign({}, action.payload, { isStarred: false }) });
        default:
            return state;
    }
};


/***/ }),

/***/ "8PpM":
/*!**********************************************************!*\
  !*** ./resources/src/reducers/studentScheduleReducer.ts ***!
  \**********************************************************/
/*! exports provided: studentScheduleReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "studentScheduleReducer", function() { return studentScheduleReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    schedule: {}
};
var studentScheduleReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STUDENT_SCHEDULE"]:
            return __assign({}, state, { schedule: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "9wca":
/*!************************************************************!*\
  !*** ./resources/src/components/Sidebar/AccountWidget.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_authActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/authActions */ "O7Nk");
/* harmony import */ var _Form_LoadingMenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Form/LoadingMenuItem */ "2Cd6");
/* harmony import */ var _Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Sidebar/NavItem */ "LBOG");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var AccountWidget = /** @class */ (function (_super) {
    __extends(AccountWidget, _super);
    function AccountWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingSignOut: false,
            menuRef: null
        };
        _this.handleClickOpen = function (event) {
            _this.setState({ menuRef: event.currentTarget });
        };
        _this.handleClose = function () {
            _this.setState({ menuRef: null });
        };
        _this.handleSignOut = function () {
            _this.setState({ loadingSignOut: true });
            _this.props.logout()
                .then(function () {
                _this.onSignOut();
            })
                .catch(function () {
                _this.onSignOut();
            });
        };
        _this.onSignOut = function () {
            _this.setState({ loadingSignOut: false });
            _this.props.onSignOut();
        };
        return _this;
    }
    AccountWidget.prototype.render = function () {
        var _this = this;
        var menuRef = this.state.menuRef;
        var menuOpen = Boolean(menuRef);
        var _a = this.props.currentUser.details, initials = _a.initials, color = _a.color;
        var profileLink;
        if (this.props.currentUser.account_type === 'staff') {
            profileLink = "/staff/" + this.props.currentUser.details.id;
        }
        else if (this.props.currentUser.account_type === 'student') {
            profileLink = "/students/" + this.props.currentUser.details.id;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_7__["NavItem"], { className: 'nav_account', title: 'Account', onClick: this.handleClickOpen },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('nav_avatar', "--" + color) }, initials)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Menu"], { open: menuOpen, anchorEl: menuRef, onClose: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'nav_account_details' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null,
                        this.props.currentUser.display_name,
                        this.props.currentUser.account_type === 'sysadmin' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Systems Admin', placement: 'left' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'sysadmin_badge' })))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", null, this.props.currentUser.display_role)),
                profileLink && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: profileLink },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { onClick: function () { return _this.handleClose(); } }, "Profile"))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingMenuItem__WEBPACK_IMPORTED_MODULE_6__["LoadingMenuItem"], { onClick: function () { return _this.handleSignOut(); }, loading: this.state.loadingSignOut }, "Sign Out"))));
    };
    return AccountWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user
}); };
var mapDispatchToProps = { logout: _actions_authActions__WEBPACK_IMPORTED_MODULE_5__["logout"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AccountWidget));


/***/ }),

/***/ "AVuO":
/*!**********************************************!*\
  !*** ./resources/src/actions/wikiActions.ts ***!
  \**********************************************/
/*! exports provided: createWikiGroup, createWikiPost, fetchWikiGroupPosts, fetchWikiGroups, fetchWikiPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWikiGroup", function() { return createWikiGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWikiPost", function() { return createWikiPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWikiGroupPosts", function() { return fetchWikiGroupPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWikiGroups", function() { return fetchWikiGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWikiPost", function() { return fetchWikiPost; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var createWikiGroup = function (wikiGroup) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('api/wiki/groups')
            .then(function (res) { return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["CREATE_WIKI_GROUP"],
            payload: res.data
        }); });
    };
};
var createWikiPost = function (wikiPost) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('api/wiki/posts')
            .then(function (res) { return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["CREATE_WIKI_POST"],
            payload: res.data
        }); });
    };
};
var fetchWikiGroupPosts = function (groupId) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("api/wiki/groups/" + groupId)
            .then(function (res) { return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_WIKI_GROUP_POSTS"],
            payload: res.data
        }); });
    };
};
var fetchWikiGroups = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('api/wiki/groups')
            .then(function (res) { return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_WIKI_GROUPS"],
            payload: res.data
        }); });
    };
};
var fetchWikiPost = function (postId) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("api/wiki/posts/" + postId)
            .then(function (res) { return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_WIKI_POST"],
            payload: res.data
        }); });
    };
};


/***/ }),

/***/ "B/6j":
/*!************************************!*\
  !*** ./resources/src/utils/api.ts ***!
  \************************************/
/*! exports provided: setAuthorizationToken, setJsonHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAuthorizationToken", function() { return setAuthorizationToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setJsonHeaders", function() { return setJsonHeaders; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "k83H");


var setAuthorizationToken = function (token) {
    if (token) {
        localStorage.setItem(_storage__WEBPACK_IMPORTED_MODULE_1__["ACCESS_TOKEN"], token);
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    else {
        localStorage.removeItem(_storage__WEBPACK_IMPORTED_MODULE_1__["ACCESS_TOKEN"]);
        delete axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Authorization'];
    }
};
var setJsonHeaders = function () {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Accept'] = 'application/json';
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Content-Type'] = 'application/json';
};


/***/ }),

/***/ "BHus":
/*!**********************************************!*\
  !*** ./resources/src/actions/starActions.ts ***!
  \**********************************************/
/*! exports provided: fetchStarred, starItem, unstarItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStarred", function() { return fetchStarred; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "starItem", function() { return starItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstarItem", function() { return unstarItem; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchStarred = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/starred')
            .then(function (res) {
            var starred = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STARRED"],
                payload: starred
            });
        });
    };
};
var starItem = function (starred) {
    return function (dispatch) {
        var uri = '/api/star';
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(uri, starred);
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["STAR_ITEM"],
            payload: starred
        });
    };
};
var unstarItem = function (starred) {
    return function (dispatch) {
        var uri = '/api/unstar';
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(uri, starred);
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["UNSTAR_ITEM"],
            payload: starred
        });
    };
};


/***/ }),

/***/ "BkIY":
/*!***************************************************!*\
  !*** ./resources/src/reducers/snackbarReducer.ts ***!
  \***************************************************/
/*! exports provided: snackbarReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snackbarReducer", function() { return snackbarReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: [],
    item: null
};
var snackbarReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["QUEUE_SNACKBAR"]:
            var keyExists = action.payload && (state.items.some(function (snackbar) {
                return snackbar.key && action.payload.key && snackbar.key === action.payload.key;
            }) || (state.item && state.item.key === action.payload.key));
            if (keyExists) {
                return state;
            }
            return __assign({}, state, { items: [action.payload].concat(state.items) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["DEQUEUE_SNACKBAR"]:
            return {
                item: state.items[state.items.length - 1] || null,
                items: state.items.slice(0, state.items.length - 1)
            };
        default:
            return state;
    }
};


/***/ }),

/***/ "DfYx":
/*!************************************************************!*\
  !*** ./resources/src/components/Modals/FeedbackDialog.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EnhancedDialogTitle */ "ePNl");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var chips = [
    { label: 'Unexpected Behavior', value: 'unexpected-behavior' },
    { label: 'New Feature', value: 'new-feature' },
    { label: 'Permissions', value: 'permissions' },
    { label: 'Connectivity', value: 'connectivity' },
    { label: 'Other', value: 'other' }
];
var initialState = {
    inputValue: '',
    selectedChips: [],
    allowReply: true,
    uploading: false
};
var FeedbackDialog = /** @class */ (function (_super) {
    __extends(FeedbackDialog, _super);
    function FeedbackDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = initialState;
        _this.handleInputChange = function (event) {
            _this.setState({ inputValue: event.target.value });
        };
        _this.handleSelectChip = function (value) {
            _this.setState(function (state) {
                return { selectedChips: state.selectedChips.concat([value]) };
            });
        };
        _this.handleDeselectChip = function (value) {
            _this.setState(function (state) {
                return { selectedChips: state.selectedChips.filter(function (chipValue) { return chipValue !== value; }) };
            });
        };
        _this.toggleChecked = function () {
            _this.setState(function (state) {
                return { allowReply: !state.allowReply };
            });
        };
        _this.handleSubmit = function (event) {
            var data = {
                allow_response: _this.state.allowReply,
                feedback: _this.state.inputValue,
                tags: _this.state.selectedChips.join(','),
                email: _this.props.currentUser.details.email
            };
            _this.setState({ uploading: true });
            axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/feedback', data)
                .then(function (res) {
                _this.setState(initialState);
                _this.props.onClose();
                _this.props.queueSnackbar({ message: 'Thanks for your feedback!' });
            });
        };
        return _this;
    }
    FeedbackDialog.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Dialog"], { open: this.props.open },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__["EnhancedDialogTitle"], { title: 'Provide Feedback', onClose: this.props.onClose }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogContent"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogContentText"], null, "We take feedback seriously to ensure Spotlight meets your school's needs."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'chips_container' }, chips.map(function (chip, index) {
                    var selected = _this.state.selectedChips.includes(chip.value);
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Chip"], { onClick: function () {
                            selected
                                ? _this.handleDeselectChip(chip.value)
                                : _this.handleSelectChip(chip.value);
                        }, variant: selected ? 'default' : 'outlined', onDelete: selected ? function () { return null; } : undefined, deleteIcon: selected ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "done") : undefined, label: chip.label, key: index }));
                })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TextField"], { value: this.state.inputValue, onChange: this.handleInputChange, placeholder: 'Describe your issue or idea', label: 'Feedback', variant: 'filled', fullWidth: true, autoFocus: true, multiline: true }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormControlLabel"], { control: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Checkbox"], { checked: this.state.allowReply, onChange: function () { return _this.toggleChecked(); }, color: 'primary' }), label: 'Allow Spotlight to contacted me in response to my feedback' })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogActions"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'text', onClick: function () { return _this.props.onClose(); } }, "Cancel"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__["LoadingButton"], { loading: this.state.uploading, variant: 'contained', color: 'primary', onClick: this.handleSubmit }, "Send"))));
    };
    return FeedbackDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user
}); };
var mapDispatchToProps = { queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_4__["queueSnackbar"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(FeedbackDialog));


/***/ }),

/***/ "E2nk":
/*!*****************************************!*\
  !*** ./resources/src/reducers/index.ts ***!
  \*****************************************/
/*! exports provided: rootReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootReducer", function() { return rootReducer; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "ANjH");
/* harmony import */ var _authReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authReducer */ "80mo");
/* harmony import */ var _checkinReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkinReducer */ "NqlT");
/* harmony import */ var _notificationReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notificationReducer */ "b4qL");
/* harmony import */ var _reportReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reportReducer */ "fvG4");
/* harmony import */ var _settingsReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settingsReducer */ "/dgb");
/* harmony import */ var _snackbarReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./snackbarReducer */ "BkIY");
/* harmony import */ var _staffProfileReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./staffProfileReducer */ "bjcN");
/* harmony import */ var _staffReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./staffReducer */ "eHEz");
/* harmony import */ var _staffScheduleReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./staffScheduleReducer */ "v5HV");
/* harmony import */ var _staffTopicsReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./staffTopicsReducer */ "rzMi");
/* harmony import */ var _starReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./starReducer */ "8Jk3");
/* harmony import */ var _studentProfileReducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./studentProfileReducer */ "pbD8");
/* harmony import */ var _studentReducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./studentReducer */ "1o1L");
/* harmony import */ var _studentScheduleReducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./studentScheduleReducer */ "8PpM");
/* harmony import */ var _topicReducer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./topicReducer */ "NniU");
/* harmony import */ var _usersReducer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./usersReducer */ "1dtU");
/* harmony import */ var _wikiReducer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./wikiReducer */ "JAFx");


















var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    auth: _authReducer__WEBPACK_IMPORTED_MODULE_1__["authReducer"],
    reports: _reportReducer__WEBPACK_IMPORTED_MODULE_4__["reportReducer"],
    settings: _settingsReducer__WEBPACK_IMPORTED_MODULE_5__["settingsReducer"],
    snackbars: _snackbarReducer__WEBPACK_IMPORTED_MODULE_6__["snackbarReducer"],
    starred: _starReducer__WEBPACK_IMPORTED_MODULE_11__["starReducer"],
    students: _studentReducer__WEBPACK_IMPORTED_MODULE_13__["studentReducer"],
    staff: _staffReducer__WEBPACK_IMPORTED_MODULE_8__["staffReducer"],
    staffProfile: _staffProfileReducer__WEBPACK_IMPORTED_MODULE_7__["staffProfileReducer"],
    staffSchedule: _staffScheduleReducer__WEBPACK_IMPORTED_MODULE_9__["staffScheduleReducer"],
    studentProfile: _studentProfileReducer__WEBPACK_IMPORTED_MODULE_12__["studentProfileReducer"],
    studentSchedule: _studentScheduleReducer__WEBPACK_IMPORTED_MODULE_14__["studentScheduleReducer"],
    notifications: _notificationReducer__WEBPACK_IMPORTED_MODULE_3__["notificationReducer"],
    checkin: _checkinReducer__WEBPACK_IMPORTED_MODULE_2__["checkinReducer"],
    topics: _topicReducer__WEBPACK_IMPORTED_MODULE_15__["topicReducer"],
    staffTopics: _staffTopicsReducer__WEBPACK_IMPORTED_MODULE_10__["staffTopicsReducer"],
    users: _usersReducer__WEBPACK_IMPORTED_MODULE_16__["usersReducer"],
    wiki: _wikiReducer__WEBPACK_IMPORTED_MODULE_17__["wikiReducer"]
});


/***/ }),

/***/ "Eccy":
/*!**************************************************!*\
  !*** ./resources/src/actions/snackbarActions.ts ***!
  \**************************************************/
/*! exports provided: queueSnackbar, dequeueSnackbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueSnackbar", function() { return queueSnackbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dequeueSnackbar", function() { return dequeueSnackbar; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "xkie");

var queueSnackbar = function (snackbar) { return function (dispatch) {
    return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_0__["QUEUE_SNACKBAR"],
        payload: snackbar
    });
}; };
var dequeueSnackbar = function () { return function (dispatch) {
    return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_0__["DEQUEUE_SNACKBAR"],
        payload: null
    });
}; };


/***/ }),

/***/ "EyUq":
/*!***********************************************!*\
  !*** ./resources/src/utils/SettingsHelper.ts ***!
  \***********************************************/
/*! exports provided: SettingsHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsHelper", function() { return SettingsHelper; });
/**
 * A helper class for retrieving settings values
 */
var SettingsHelper = /** @class */ (function () {
    function SettingsHelper(settings) {
        var _this = this;
        /**
         * Retrieves a setting from the settings collection.
         */
        this.getSetting = function (key) {
            if (_this.settings && _this.settings[key]) {
                return _this.settings[key];
            }
            else {
                return null;
            }
        };
        /**
         * Returns a setting's value given a setting key.
         */
        this.getValue = function (key) {
            var setting = _this.getSetting(key);
            return setting && setting.value ? setting.value : null;
        };
        this.settings = settings;
    }
    return SettingsHelper;
}());



/***/ }),

/***/ "FJV1":
/*!**********************************************************!*\
  !*** ./resources/src/components/Modals/ColorsDialog.tsx ***!
  \**********************************************************/
/*! exports provided: ColorsDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorsDialog", function() { return ColorsDialog; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../theme */ "TQGL");




var ColorsDialog = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(props.selected), selected = _a[0], setSelected = _a[1];
    var onColorClick = function (color) {
        setSelected(color);
    };
    var onExited = function () {
        setSelected(props.selected);
    };
    var handleSelect = function () {
        props.onSelect(selected);
        props.onClose();
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { className: 'colors_dialog', open: props.open, onExited: onExited },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], null, "Choose Color"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, "Choose from one of the colors below."),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'colors_dialog__colors' }, _theme__WEBPACK_IMPORTED_MODULE_3__["COLORS"].map(function (color) {
                var _a;
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { onClick: function () { return onColorClick(color.name); }, className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('color', (_a = {}, _a['--selected'] = color.name === selected, _a)) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('color__swatch', "--" + color.name) }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'color__name' }, color.label)));
            }))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'contained', color: 'primary', onClick: function () { return handleSelect(); } }, "Select"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"))));
};


/***/ }),

/***/ "FMSP":
/*!**********************************************************!*\
  !*** ./resources/src/components/CheckIn/CheckInForm.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! copy-to-clipboard */ "+QRC");
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_checkinActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/checkinActions */ "xZWj");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/storage */ "k83H");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _ChipSelect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ChipSelect */ "3k4I");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _ModalSection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ModalSection */ "3l0q");
/* harmony import */ var _ConfirmDeleteDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ConfirmDeleteDialog */ "kvhC");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();












var CheckInForm = /** @class */ (function (_super) {
    __extends(CheckInForm, _super);
    function CheckInForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            chips: [],
            confirmDeleteDialogOpen: false,
            errored: false,
            menuRef: null,
            uploading: false
        };
        _this.handleCreateChip = function (chip) {
            if (!chip) {
                return;
            }
            chip.value = new Date();
            chip.title = chip.value.toString();
            _this.setState(function (state) { return ({
                chips: state.chips.concat([chip])
            }); });
            _this.props.onPreventNavigation();
        };
        _this.handleRemoveChip = function (index) {
            // const removeIndex: number = this.findChip(chip)
            _this.setState(function (state) {
                state.chips.splice(index, 1);
                return { chips: state.chips };
            }, function () {
                if (_this.state.chips.length === 0) {
                    _this.props.onAllowNavigation();
                }
            });
        };
        _this.showResults = function () {
            var success = _this.props.checkInResponse.success;
            var errors = _this.props.checkInResponse.errors;
            var checkInError = {
                timestamp_string: _this.props.checkInResponse.timestamp_string,
                errors: errors
            };
            if (errors.length > 0) {
                Object(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["appendToLocalStorageArray"])(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["CHECK_IN_ERRORS"], checkInError);
            }
            var message = success.length > 0
                ? "Checked in " + success.length + " " + (success.length === 1 ? 'student' : 'students') + (errors && errors.length > 0
                    ? ", but " + errors.length + " " + (errors.length === 1 ? 'entry' : 'entries') + " could not be resolved" : '') + "."
                : 'No students where checked in.';
            _this.props.queueSnackbar({
                message: message,
                buttons: errors && errors.length > 0 && _this.props.handleOpenErrorsDialog ? [{
                        value: 'Show Errors', callback: function () { return _this.props.handleOpenErrorsDialog(); }
                    }] : undefined,
                links: !_this.props.handleOpenErrorsDialog ? [{
                        value: 'Show Errors', to: '/check-in/#errors'
                    }] : undefined,
                key: 'CHECKED_IN_SUCCESSFULLY'
            });
        };
        _this.handleSubmit = function () {
            if (_this.state.chips.length === 0) {
                return;
            }
            _this.setState({ uploading: true });
            if (_this.props.onSubmit) {
                _this.props.onSubmit();
            }
            var request = {
                chips: _this.state.chips.map(function (chip) { return ({ value: chip.label, timestamp: chip.value.toISOString() }); }),
                type: 'student_number',
                date: _this.props.dateTime
            };
            _this.props.checkIn(request)
                .then(function () {
                if (_this.props.onCheckIn) {
                    _this.props.onCheckIn().then(function () { return _this.finishCheckIn(); });
                }
                else {
                    _this.finishCheckIn();
                }
            }, function () {
                _this.setState({ uploading: false });
            });
        };
        _this.finishCheckIn = function () {
            _this.setState({ uploading: false, chips: [] });
            _this.showResults();
            _this.props.onAllowNavigation();
        };
        _this.handleMenuClick = function (callback) {
            _this.handleMenuClose();
            callback();
        };
        _this.handleCopyChips = function () {
            var clipboardData = _this.state.chips
                .map(function (chip) { return chip.label.trim(); })
                .join(', ');
            copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0___default()(clipboardData);
            _this.props.queueSnackbar({ message: 'Copied Student Numbers to clipboard.' });
        };
        _this.handleDownloadChips = function () {
            var rows = [
                ['Student Number', 'Timestmap']
            ].concat(_this.state.chips.map(function (chip) { return [chip.label, chip.value.toISOString()]; }));
            var dateString = new Date().toISOString();
            var filename = "SpotlightStudentNumbers - " + dateString;
            Object(_utils_utils__WEBPACK_IMPORTED_MODULE_7__["downloadCsv"])(rows, filename);
            _this.props.queueSnackbar({ message: 'Downloaded Student Numbers.' });
        };
        _this.handleRemoveAllChips = function () {
            _this.setState(function (state) {
                _this.props.queueSnackbar({
                    message: 'Removed all Student Numbers.',
                    buttons: [{ value: 'Undo', callback: function () { return _this.setState({ chips: state.chips }); } }]
                });
                return { chips: [] };
            }, function () {
                _this.props.onAllowNavigation();
            });
        };
        _this.handleMenuOpen = function (event) {
            _this.setState({ menuRef: event.currentTarget });
        };
        _this.handleMenuClose = function () {
            _this.setState({ menuRef: null });
        };
        return _this;
    }
    CheckInForm.prototype.render = function () {
        var _this = this;
        var hasChips = this.state.chips.length > 0;
        var menuOpen = Boolean(this.state.menuRef);
        var disabled = this.props.disabled || this.state.uploading;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ModalSection__WEBPACK_IMPORTED_MODULE_10__["ModalSection"], { badgeCount: this.state.chips.length, icon: 'keyboard', title: 'Scan or Enter' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ChipSelect__WEBPACK_IMPORTED_MODULE_8__["default"], { chips: this.state.chips, onCreateChip: this.handleCreateChip, onRemoveChip: this.handleRemoveChip, disabled: disabled, placeholder: 'Enter Student Numbers', helperText: hasChips ? "Ensure all students have entered their Student Numbers, then press 'Check In.'" : undefined }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'check_in_actions' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_9__["LoadingButton"], { variant: 'contained', color: 'primary', disabled: !hasChips, loading: this.state.uploading, onClick: function () { return _this.handleSubmit(); } }, "Check In")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: this.handleMenuOpen, disabled: this.state.chips.length === 0 },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "more_horiz")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Menu"], { open: menuOpen, onClose: this.handleMenuClose, anchorEl: this.state.menuRef, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, getContentAnchorEl: undefined, transformOrigin: { vertical: 'top', horizontal: 'right' } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["MenuItem"], { onClick: function () { return _this.handleMenuClick(function () { return _this.setState({ confirmDeleteDialogOpen: true }); }); } }, "Remove All"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["MenuItem"], { onClick: function () { return _this.handleMenuClick(_this.handleCopyChips); } }, "Copy to Clipboard"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["MenuItem"], { onClick: function () { return _this.handleMenuClick(_this.handleDownloadChips); } }, "Download Student Numbers"))))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ConfirmDeleteDialog__WEBPACK_IMPORTED_MODULE_11__["default"], { open: this.state.confirmDeleteDialogOpen, onClose: function () { return _this.setState({ confirmDeleteDialogOpen: false }); }, onSubmit: function () { return _this.handleRemoveAllChips(); } })));
    };
    return CheckInForm;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    checkInResponse: state.checkin.response
}); };
var mapDispatchToProps = {
    checkIn: _actions_checkinActions__WEBPACK_IMPORTED_MODULE_4__["checkIn"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_5__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CheckInForm));


/***/ }),

/***/ "FRPp":
/*!**************************************************************!*\
  !*** ./resources/src/components/Calendar/NewAppointment.tsx ***!
  \**************************************************************/
/*! exports provided: NewAppointment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewAppointment", function() { return NewAppointment; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");



var NewAppointment = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), open = _a[0], setOpen = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), errored = _b[0], setErrored = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(''), inputValue = _c[0], setInputValue = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), clearSchedule = _e[0], setClearSchedule = _e[1];
    var handleChange = function (event) {
        if (loading) {
            return;
        }
        setInputValue(event.target.value);
        setErrored(false);
    };
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setInputValue('');
        setOpen(false);
        setLoading(false);
        setErrored(false);
        props.onClose();
    };
    var handleSubmit = function () {
        setLoading(true);
        setErrored(false);
        var appointment = {
            memo: inputValue,
            clearSchedule: clearSchedule
        };
        props.onSubmit(appointment).then(function (res) {
            handleClose();
        }).catch(function (error) {
            setErrored(true);
            setLoading(false);
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_widget' }, open ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { value: inputValue, onChange: handleChange, variant: 'filled', label: 'New Appointment', placeholder: 'Memo', margin: 'normal', helperText: errored ? 'Please try that again.' : undefined, error: errored, autoFocus: true, fullWidth: true, multiline: true }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], { label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'info_tooltip' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], null, "Clear schedule"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], { title: "Student's schedule will be cleared for the Appointment." },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], null, "help"))), control: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { checked: clearSchedule, onChange: function () { return setClearSchedule(!clearSchedule); }, color: 'primary' }) }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_widget__actions' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_2__["LoadingButton"], { loading: loading, onClick: function () { return handleSubmit(); }, variant: 'text', color: 'primary' }, "Submit"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: function () { return handleClose(); }, variant: 'text' }, "Cancel"))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_item__container' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', color: 'primary', onClick: handleOpen }, "Make Appointment")))));
};


/***/ }),

/***/ "FZ7O":
/*!******************************************************************!*\
  !*** ./resources/src/components/Reporting/ReportDeleteModal.tsx ***!
  \******************************************************************/
/*! exports provided: ReportDeleteModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportDeleteModal", function() { return ReportDeleteModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");



var ReportDeleteModal = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), loading = _a[0], setLoading = _a[1];
    var handleSubmit = function () {
        setLoading(true);
        props.onDelete(props.report.id)
            .then(function () {
            setLoading(false);
            props.onClose();
        })
            .catch(function (error) {
            setLoading(false);
            props.onClose();
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, "Delete Report"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, "Are you sure you want to delete this Report?"),
            props.report && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'overline' }, props.variantDetails.name),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'h5' }, props.report.name || 'Report'),
                props.report.date_created && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'subtitle1' }, props.report.date_created))))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_2__["LoadingButton"], { loading: loading, variant: 'text', color: 'primary', onClick: function () { return handleSubmit(); } }, "Delete"))));
};



/***/ }),

/***/ "G10q":
/*!*****************************************************!*\
  !*** ./resources/src/components/Views/Settings.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_settingsActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/settingsActions */ "aT6W");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TopNav */ "qcP7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: 0,
            loading: false
        };
        _this.handleClick = function (index) {
            _this.setState(function (state) {
                return { expanded: state.expanded === index ? -1 : index };
            });
        };
        return _this;
    }
    Settings.prototype.componentDidMount = function () {
        this.props.fetchSettings();
    };
    Settings.prototype.render = function () {
        var _this = this;
        var settingsGroups = this.props.settingsGroups;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_4__["TopNav"], { breadcrumbs: [{ value: 'Settings', to: '/settings' }] }),
            settingsGroups.length && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'settings' }, settingsGroups.map(function (settingsGroup, index) {
                var expanded = index === _this.state.expanded;
                return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ExpansionPanel"], { className: 'expansion-panel', key: index, expanded: expanded },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ExpansionPanelSummary"], { expandIcon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "expand_more"), onClick: function () { return _this.handleClick(index); } },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'expansion-panel__heading' }, settingsGroup.name),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'expansion-panel__subheading' }, settingsGroup.description)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ExpansionPanelDetails"], { className: 'expansion-panel__details' }, settingsGroup.settings.length && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, settingsGroup.settings.map(function (setting) {
                        var control;
                        switch (setting.type) {
                            case 'boolean':
                                control = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Switch"], { id: setting.key, checked: setting.value }));
                                break;
                            case 'numeric':
                                control = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { value: setting.value, id: setting.key, type: 'number', required: true }));
                                break;
                            case 'datetime':
                                control = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null));
                                break;
                            case 'string':
                            default:
                                control = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { value: setting.value, id: setting.key, type: 'string', required: true }));
                                break;
                        }
                        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'setting' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, setting.description),
                            control));
                    }))))));
            })))));
    };
    return Settings;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    settingsGroups: state.settings.items
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, { fetchSettings: _actions_settingsActions__WEBPACK_IMPORTED_MODULE_3__["fetchSettings"] })(Settings));


/***/ }),

/***/ "G75r":
/*!***************************************!*\
  !*** ./resources/src/utils/report.ts ***!
  \***************************************/
/*! exports provided: EMPTY_REPORT, REPORT_PLACEHOLDER_NAME, createEmptyReport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_REPORT", function() { return EMPTY_REPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPORT_PLACEHOLDER_NAME", function() { return REPORT_PLACEHOLDER_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmptyReport", function() { return createEmptyReport; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var EMPTY_REPORT = {
    date_range: {
        type: 'predefined',
        range: 'last-week'
    },
    segment: 'day',
    access: 'private'
};
var REPORT_PLACEHOLDER_NAME = 'New Report';
/**
 * Creates an empty report when given a report variant
 * @param variant The report variant.
 * @param report The empty report.
 */
var createEmptyReport = function (variant, report) {
    if (report === void 0) { report = EMPTY_REPORT; }
    return __assign({ variant: variant }, report);
};


/***/ }),

/***/ "GAL+":
/*!******************************************************!*\
  !*** ./resources/src/components/CheckIn/CheckIn.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @date-io/date-fns */ "mPma");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/pickers */ "K1a+");
/* harmony import */ var _actions_checkinActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/checkinActions */ "xZWj");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _ModalSection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ModalSection */ "3l0q");
/* harmony import */ var _SelectableList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../SelectableList */ "kFjw");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../TopNav */ "qcP7");
/* harmony import */ var _CheckInForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CheckInForm */ "FMSP");
/* harmony import */ var _ErrorsDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ErrorsDialog */ "PqiN");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
















var CheckIn = /** @class */ (function (_super) {
    __extends(CheckIn, _super);
    function CheckIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            date: new Date(),
            datePickerOpen: false,
            errorsDialogOpen: false,
            loadingStatus: false,
            preventNavigation: false,
            refreshing: false,
            scheduledSelected: []
        };
        _this.handleDatePickerOpen = function () {
            _this.setState({ datePickerOpen: true });
        };
        _this.handleDatePickerClose = function () {
            _this.setState({ datePickerOpen: false });
        };
        _this.handleDatePickerSelect = function (date) {
            _this.setState({ date: date });
            _this.fetchStatus(date.toISOString());
        };
        _this.fetchStatus = function (dateTime) {
            _this.setState({ loadingStatus: true });
            return _this.props.fetchCheckInStatus(dateTime)
                .then(function () {
                _this.setState({ loadingStatus: false });
            });
        };
        _this.refreshStatus = function () {
            _this.setState({ refreshing: true });
            _this.props.fetchCheckInStatus(_this.state.date.toISOString())
                .then(function () { return _this.setState({ refreshing: false }); });
        };
        _this.fetchPrevious = function () {
            _this.fetchStatus(_this.props.checkInStatus.previous);
        };
        _this.fetchNext = function () {
            _this.fetchStatus(_this.props.checkInStatus.next);
        };
        _this.fetchToday = function () {
            _this.fetchStatus(_this.props.checkInStatus.today);
        };
        _this.handleScheduledCheckIn = function (selected) {
            var timestamp = new Date().toISOString();
            var request = {
                chips: selected.map(function (value) { return ({ value: value, timestamp: timestamp }); }),
                type: 'student_id',
                date: _this.props.checkInStatus.date.full_date
            };
            return _this.props.checkIn(request)
                .then(function () {
                return _this.props.fetchCheckInStatus(_this.props.checkInStatus.date.full_date)
                    .then(function () {
                    _this.props.queueSnackbar({ message: 'Checked in students successfully. ' });
                });
            });
        };
        _this.handleSelectAllScheduled = function () {
            if (!_this.props.checkInStatus.blocks || !_this.props.checkInStatus.blocks[0].planned) {
                return;
            }
            var allSelected = _this.state.scheduledSelected.length === _this.props.checkInStatus.blocks[0].planned.length;
            _this.setState({
                scheduledSelected: allSelected
                    ? []
                    : _this.props.checkInStatus.blocks[0].planned.map(function (plan) { return plan.student.id; })
            });
        };
        _this.handleSelectScheduled = function (id, newSelected) {
            _this.setState(function (state) { return ({
                scheduledSelected: newSelected ? (state.scheduledSelected.concat([id])) : (state.scheduledSelected.filter(function (selected) { return selected !== id; }))
            }); });
        };
        _this.handleOpenErrorsDialog = function () {
            _this.setState({ errorsDialogOpen: true });
        };
        _this.handleCloseErrorsDialog = function () {
            _this.setState({ errorsDialogOpen: false });
        };
        _this.handleAllowNavigation = function () {
            _this.setState({ preventNavigation: false });
        };
        _this.handlePreventNavigation = function () {
            _this.setState({ preventNavigation: true });
        };
        return _this;
    }
    CheckIn.prototype.componentDidMount = function () {
        if (this.props.location.hash === '#errors') {
            this.setState({ errorsDialogOpen: true });
        }
        this.fetchStatus();
    };
    CheckIn.prototype.componentDidUpdate = function () {
        if (this.state.preventNavigation) {
            window.onbeforeunload = function () { return true; };
        }
        else {
            window.onbeforeunload = undefined;
        }
    };
    CheckIn.prototype.render = function () {
        var _this = this;
        var scheduled = this.props.checkInStatus.blocks.length > 0 ? (this.props.checkInStatus.blocks[0].planned.map(function (plan) {
            return { id: plan.student.id, label: plan.student.name };
        })) : [];
        var checkedIn = this.props.checkInStatus.blocks.length > 0 ? (this.props.checkInStatus.blocks[0].ledger_entries) : [];
        var actions = [
            { icon: 'check', title: 'Check In', callback: this.handleScheduledCheckIn }
        ];
        var CheckInLoader = function () { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { style: { width: 476, height: 558 } },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_3__["default"], { width: 476, height: 558 },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 14, rx: 4, ry: 4, width: 120, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 136, y: 8, rx: 36, ry: 36, width: 36, height: 36 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 180, y: 8, rx: 36, ry: 36, width: 36, height: 36 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 232, y: 14, rx: 4, ry: 4, width: 72, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 64, rx: 4, ry: 4, width: 108, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 112, rx: 16, ry: 16, width: 450, height: 32 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 172, rx: 4, ry: 4, width: 132, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 212, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 216, rx: 4, ry: 4, width: 96, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 260, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 264, rx: 4, ry: 4, width: 108, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 292, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 296, rx: 4, ry: 4, width: 124, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 324, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 328, rx: 4, ry: 4, width: 64, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 376, rx: 4, ry: 4, width: 92, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 416, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 420, rx: 4, ry: 4, width: 120, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 464, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 468, rx: 4, ry: 4, width: 136, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 496, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 500, rx: 4, ry: 4, width: 64, height: 16 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 24, y: 538, rx: 4, ry: 4, width: 24, height: 24 }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 64, y: 542, rx: 4, ry: 4, width: 108, height: 16 }))))); };
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Prompt"], { when: this.state.preventNavigation, message: 'All unsubmitted student numbers will be lost. Are you sure you want to exit?' }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'content', id: 'content' },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ErrorsDialog__WEBPACK_IMPORTED_MODULE_15__["default"], { open: this.state.errorsDialogOpen, onClose: this.handleCloseErrorsDialog }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_13__["TopNav"], { breadcrumbs: [{ value: 'Check-in' }], actions: (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { title: 'List Errors' },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["IconButton"], { onClick: function () { return _this.handleOpenErrorsDialog(); } },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Icon"], null, "error_outline")))) }),
                (this.state.loadingStatus && this.props.checkInStatus) ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CheckInLoader, null)) : (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", { className: 'calendar_header' },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_7__["MuiPickersUtilsProvider"], { utils: _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__["default"] },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_7__["DatePicker"], { variant: 'dialog', open: this.state.datePickerOpen, onClose: this.handleDatePickerClose, value: this.state.date, onChange: this.handleDatePickerSelect, TextFieldComponent: function () { return null; } })),
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], { disabled: this.state.preventNavigation, onClick: function () { return _this.handleDatePickerOpen(); }, variant: 'outlined' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], { variant: 'button', color: this.props.checkInStatus.date.is_today ? 'inherit' : 'error' }, this.props.checkInStatus.date ? (this.props.checkInStatus.date.day + " " + this.props.checkInStatus.date.full_date) : 'Select Date'))),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { title: 'Back', placement: 'top' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["IconButton"], { onClick: function () { return _this.fetchPrevious(); }, disabled: this.state.preventNavigation },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Icon"], null, "chevron_left")))),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { title: 'Next', placement: 'top' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["IconButton"], { onClick: function () { return _this.fetchNext(); }, disabled: this.state.preventNavigation },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Icon"], null, "chevron_right")))),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], { variant: 'outlined', color: 'primary', onClick: function () { return _this.fetchToday(); }, disabled: (this.props.checkInStatus.date && this.props.checkInStatus.date.is_today) || this.state.preventNavigation }, "Today")),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { title: 'Refresh', placement: 'top' },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["IconButton"], { onClick: function () { return _this.refreshStatus(); }, disabled: this.state.refreshing || this.state.preventNavigation },
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Icon"], null, "refresh"))))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["TextField"], { select: true, variant: 'outlined', value: 'focus-block', onChange: function () { return null; }, margin: 'dense', label: 'Block', disabled: true },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { value: 'focus-block' }, "Focus Block")),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_CheckInForm__WEBPACK_IMPORTED_MODULE_14__["default"], { disabled: false, dateTime: this.props.checkInStatus.date.full_date, onCheckIn: function () { return _this.props.fetchCheckInStatus(_this.props.checkInStatus.date.full_date); }, onPreventNavigation: this.handlePreventNavigation, onAllowNavigation: this.handleAllowNavigation, handleOpenErrorsDialog: this.handleOpenErrorsDialog }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ModalSection__WEBPACK_IMPORTED_MODULE_11__["ModalSection"], { icon: 'event', title: 'Scheduled', count: scheduled.length, emptyState: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], null, "No students scheduled.") },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_SelectableList__WEBPACK_IMPORTED_MODULE_12__["SelectableList"], { title: 'Scheduled Students', selected: this.state.scheduledSelected, items: scheduled, actions: actions, sortable: true, sortLabel: 'Name', onSelectAll: this.handleSelectAllScheduled, onToggleSelected: this.handleSelectScheduled })),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ModalSection__WEBPACK_IMPORTED_MODULE_11__["ModalSection"], { icon: 'how_to_reg', title: 'Checked In', count: checkedIn.length, emptyState: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], null, "No students checked in.") },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["List"], { dense: true }, checkedIn.map(function (ledgerEntry) {
                            var methodDetails = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_10__["getMethodDetailsFromName"])(ledgerEntry.method);
                            return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["ListItem"], { key: ledgerEntry.id },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["ListItemAvatar"], null,
                                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('student_avatar', "--" + ledgerEntry.student.color) }, ledgerEntry.student.initials)),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["ListItemText"], { primary: ledgerEntry.student.name, secondary: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: '--flex-row' },
                                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], { variant: 'overline' }, ledgerEntry.time),
                                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { title: methodDetails.title },
                                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Icon"], null, methodDetails.icon))) })));
                        }))))))));
    };
    return CheckIn;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component));
var mapStateToProps = function (state) { return ({
    checkInStatus: state.checkin.status
}); };
var mapDispatchToProps = { checkIn: _actions_checkinActions__WEBPACK_IMPORTED_MODULE_8__["checkIn"], fetchCheckInStatus: _actions_checkinActions__WEBPACK_IMPORTED_MODULE_8__["fetchCheckInStatus"], queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_9__["queueSnackbar"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(CheckIn));


/***/ }),

/***/ "I5WJ":
/*!**********************************************************!*\
  !*** ./resources/src/components/Modals/TopicsDialog.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_topicActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/topicActions */ "N49g");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../theme */ "TQGL");
/* harmony import */ var _Calendar_CalendarDialogItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Calendar/CalendarDialogItem */ "Kpek");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../EmptyStateIcon */ "iea3");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _ColorsDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ColorsDialog */ "FJV1");
/* harmony import */ var _ConfirmationDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ConfirmationDialog */ "tlAg");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};











var emptyTopic = function () { return ({
    memo: '',
    color: Object(_theme__WEBPACK_IMPORTED_MODULE_5__["getRandomColor"])().name,
    unavailable: false
}); };
var TopicsDialog = /** @class */ (function (_super) {
    __extends(TopicsDialog, _super);
    function TopicsDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingTopics: false,
            loadingNewTopic: false,
            errored: false,
            newTopicErrored: false,
            newTopicOpen: false,
            colorDialogOpen: false,
            newTopic: emptyTopic(),
            deleteTopicDialogOpen: false,
            deleteTopic: { id: 0, color: null, deleted: false, memo: '', staff: null, unavailable: false }
        };
        _this.handleNewTopicOpen = function () {
            _this.setState({ newTopicOpen: true });
        };
        _this.handleNewTopicClose = function () {
            _this.setState({ newTopicOpen: false });
        };
        _this.handleNewTopic = function () {
            _this.setState({
                loadingNewTopic: true,
                newTopicErrored: false
            });
            _this.props.createTopic(_this.state.newTopic)
                .then(function (res) {
                _this.setState({
                    loadingNewTopic: false,
                    newTopicOpen: false,
                    newTopic: emptyTopic()
                });
            })
                .catch(function (error) {
                _this.setState({
                    loadingNewTopic: false,
                    newTopicErrored: true
                });
            });
        };
        _this.handleNewTopicChange = function (event) {
            var memo = event.target.value;
            if (_this.state.loadingNewTopic) {
                return;
            }
            _this.setState(function (state) {
                return {
                    newTopic: __assign({}, state.newTopic, { memo: memo }),
                    newTopicErrored: false
                };
            });
        };
        _this.handleTopicColorChange = function (color) {
            _this.setState(function (state) {
                return {
                    newTopic: __assign({}, state.newTopic, { color: color })
                };
            });
        };
        _this.handleNewTopicUnavailablityToggle = function () {
            _this.setState(function (state) { return ({
                newTopic: __assign({}, state.newTopic, { unavailable: !state.newTopic.unavailable })
            }); });
        };
        _this.handleColorDialogOpen = function () {
            _this.setState({ colorDialogOpen: true });
        };
        _this.handleColorDialogClose = function () {
            _this.setState({ colorDialogOpen: false });
        };
        _this.handleDeleteTopicDialogOpen = function () {
            _this.setState({ deleteTopicDialogOpen: true });
        };
        _this.handleDeleteTopicDialogClose = function () {
            _this.setState({ deleteTopicDialogOpen: false });
        };
        _this.handleDeleteTopic = function (topic) {
            _this.setState({ deleteTopic: topic });
            _this.handleDeleteTopicDialogOpen();
        };
        _this.onDeleteTopic = function () {
            return _this.props.deleteTopic(_this.state.deleteTopic.id);
        };
        _this.handleClose = function () {
            _this.props.onClose();
            _this.setState({ newTopicOpen: false });
        };
        _this.handleClick = function (topic) {
            _this.props.onSelect(topic);
            _this.props.onClose();
        };
        return _this;
    }
    TopicsDialog.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ loadingTopics: true });
        this.props.fetchTopics()
            .then(function (res) {
            _this.setState({ loadingTopics: false });
        });
    };
    TopicsDialog.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Dialog"], { className: 'topics_dialog', open: this.props.open },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogTitle"], null, this.props.mode === 'edit' ? 'Topics' : 'Select Topic'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogContent"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogContentText"], null, this.props.mode === 'edit'
                        ? 'Create new Topics or edit already existing ones.'
                        : 'Select a Topic to use for the block.'),
                    this.state.loadingTopics ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Loading")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                        ((!this.props.topics || this.props.topics.length === 0)
                            && !this.state.newTopicOpen) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_7__["EmptyStateIcon"], { variant: 'not-found' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "You don't have any Topics yet."),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'contained', color: 'primary', onClick: function () { return _this.handleNewTopicOpen(); } }, "New Topic"))),
                        (this.props.topics && this.props.topics.length > 0) && (this.props.topics.map(function (topic) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_CalendarDialogItem__WEBPACK_IMPORTED_MODULE_6__["CalendarDialogItem"], { onClick: _this.props.mode === 'select'
                                ? function () { return _this.handleClick(topic); }
                                : undefined, onCloseDialog: _this.handleClose, details: {
                                id: topic.id,
                                title: topic.memo,
                                variant: topic.color,
                                memo: topic.unavailable ? 'Unavailable' : undefined
                            }, actions: _this.props.mode === 'edit' ? [
                                {
                                    value: 'Delete Topic',
                                    callback: function () { return Promise.resolve(_this.handleDeleteTopic(topic)); }
                                }
                            ] : undefined, key: topic.id })); })),
                        this.state.newTopicOpen && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'topics_dialog__new' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'topic_name' },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('color_swatch', "--" + this.state.newTopic.color) },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Change Color', placement: 'top' },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: function () { return _this.handleColorDialogOpen(); } },
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "palette")))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TextField"], { value: this.state.newTopic.memo, onChange: this.handleNewTopicChange, variant: 'filled', label: 'New Topic', placeholder: 'What will you be offering?', margin: 'none', helperText: this.state.newTopicErrored
                                            ? 'Please try that again.'
                                            : undefined, error: this.state.errored, autoFocus: true, fullWidth: true })),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormControlLabel"], { label: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'info_tooltip' },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], null, "Unavailable"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Student will not be able to join Unavailable blocks.' },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "help"))), control: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Checkbox"], { checked: this.state.newTopic.unavailable, onChange: this.handleNewTopicUnavailablityToggle, color: 'primary' }) })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_8__["LoadingButton"], { variant: 'text', color: 'primary', onClick: function () { return _this.handleNewTopic(); }, loading: this.state.loadingNewTopic }, "Submit"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'text', onClick: function () { return _this.handleNewTopicClose(); } }, "Cancel")))))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogActions"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'text', color: 'primary', onClick: function () { return _this.handleNewTopicOpen(); } }, "New Topic"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'text', onClick: function () { return _this.handleClose(); } }, this.props.mode === 'edit' ? 'Close' : 'Cancel'))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ColorsDialog__WEBPACK_IMPORTED_MODULE_9__["ColorsDialog"], { open: this.state.colorDialogOpen, onClose: this.handleColorDialogClose, onSelect: this.handleTopicColorChange, selected: this.state.newTopic.color }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ConfirmationDialog__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialog"], { open: this.state.deleteTopicDialogOpen, item: this.state.deleteTopic, title: 'Delete Topic', bodyText: 'The following Topic will be deleted:', calendarItem: {
                    title: this.state.deleteTopic.memo,
                    variant: this.state.deleteTopic.color
                }, onClose: this.handleDeleteTopicDialogClose, onSubmit: this.onDeleteTopic })));
    };
    return TopicsDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    topics: state.topics.items
}); };
var mapDispatchToProps = {
    createTopic: _actions_topicActions__WEBPACK_IMPORTED_MODULE_4__["createTopic"],
    deleteTopic: _actions_topicActions__WEBPACK_IMPORTED_MODULE_4__["deleteTopic"],
    fetchTopics: _actions_topicActions__WEBPACK_IMPORTED_MODULE_4__["fetchTopics"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TopicsDialog));


/***/ }),

/***/ "IUXy":
/*!************************************************!*\
  !*** ./resources/src/components/Wiki/Wiki.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_wikiActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/wikiActions */ "AVuO");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../TopNav */ "qcP7");
/* harmony import */ var _WikiPost__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./WikiPost */ "xLDs");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var Wiki = /** @class */ (function (_super) {
    __extends(Wiki, _super);
    function Wiki() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingGroups: false,
            loadingGroupPosts: false,
            loadingPost: false,
        };
        _this.fetchWikiGroupPosts = function (groupId) {
            _this.setState({ loadingGroupPosts: true });
            return _this.props.fetchWikiGroupPosts(groupId)
                .then(function () {
                _this.setState({ loadingGroupPosts: false });
            });
        };
        _this.fetchWikiGroups = function () {
            _this.setState({ loadingGroups: true });
            return _this.props.fetchWikiGroups()
                .then(function () {
                _this.setState({ loadingGroups: false });
            });
        };
        _this.fetchWikiPost = function (postId) {
            _this.setState({ loadingPost: true });
            return _this.props.fetchWikiPost(postId)
                .then(function () {
                _this.setState({ loadingPost: false });
            });
        };
        return _this;
    }
    Wiki.prototype.componentDidMount = function () {
        this.fetchWikiGroups();
        var params = this.props.match.params;
        var groupId = parseInt(params.groupId, 10) || null;
        var postId = parseInt(params.postId, 10) || null;
        console.log('Params:', params);
        var searchParams = new URLSearchParams(this.props.location.search);
        if (this.props.wikiRoute === 'group') {
            this.fetchWikiGroupPosts(groupId);
        }
        else if (this.props.wikiRoute === 'post') {
            this.fetchWikiPost(postId);
        }
    };
    Wiki.prototype.render = function () {
        var _this = this;
        var params = this.props.match.params;
        var urlGroupId = parseInt(params.groupId, 10) || null;
        var loadingGroupPosts = this.state.loadingGroups || this.state.loadingGroupPosts;
        var loadingPost = this.state.loadingGroups || this.state.loadingPost;
        var wikiGroup = this.props.wikiGroups.find(function (group) {
            return _this.props.wikiRoute === 'group'
                ? group.id === urlGroupId
                : _this.props.wikiPost && group.id === _this.props.wikiPost.group_id;
        });
        var breadcrumbs = [{
                value: 'Spotlight Help',
                to: '/wiki'
            }];
        if (this.props.wikiRoute !== 'none') {
            if (wikiGroup && !this.state.loadingGroups) {
                breadcrumbs.push({
                    value: wikiGroup.title,
                    to: "/wiki/" + wikiGroup.id,
                    onClick: this.props.wikiPosts
                        ? undefined
                        : function () { return _this.fetchWikiGroupPosts(wikiGroup.id); }
                });
            }
        }
        if (this.props.wikiRoute === 'post') {
            if (this.props.wikiPost && !loadingPost && !this.state.loadingGroups) {
                breadcrumbs.push({
                    value: this.props.wikiPost.title,
                    to: "/wiki/post/" + this.props.wikiPost.id
                });
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_6__["TopNav"], { breadcrumbs: breadcrumbs }),
            this.props.wikiRoute === 'none' && (this.state.loadingGroups ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { width: 800, height: 800 } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 800, height: 800 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 32, x: 16, height: 28, width: 250 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 68, x: 16, height: 18, width: 320 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 104, x: 16, height: 28, width: 220 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 140, x: 16, height: 18, width: 120 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 176, x: 16, height: 28, width: 320 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 212, x: 16, height: 18, width: 160 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 248, x: 16, height: 28, width: 165 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 284, x: 16, height: 18, width: 365 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 320, x: 16, height: 28, width: 195 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 356, x: 16, height: 18, width: 435 })))) : (this.props.wikiGroups && this.props.wikiGroups.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["List"], null, this.props.wikiGroups.map(function (group) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { key: group.id, to: "/wiki/" + group.id, onClick: function () { return _this.fetchWikiGroupPosts(group.id); } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItem"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'h6', color: 'primary' }, group.title),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'subtitle1' }, group.subtitle))))); }))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "No Wiki groups were found.")))),
            this.props.wikiRoute === 'group' && (this.state.loadingGroupPosts ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { width: 800, height: 800 } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 800, height: 800 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 32, x: 16, height: 28, width: 250 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 68, x: 16, height: 18, width: 320 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 104, x: 16, height: 28, width: 220 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 140, x: 16, height: 18, width: 120 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 176, x: 16, height: 28, width: 320 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 212, x: 16, height: 18, width: 160 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 248, x: 16, height: 28, width: 165 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 284, x: 16, height: 18, width: 365 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 320, x: 16, height: 28, width: 195 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 356, x: 16, height: 18, width: 435 })))) : (this.props.wikiPosts && this.props.wikiPosts.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["List"], null, this.props.wikiPosts.map(function (post) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { key: post.id, to: "/wiki/post/" + post.id, onClick: function () { return _this.fetchWikiPost(post.id); } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItem"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'h6', color: 'primary' }, post.title),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'subtitle1' }, post.author.name))))); }))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "No Wiki posts were found.")))),
            this.props.wikiRoute === 'post' && (loadingPost ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { width: 800, height: 800 } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 800, height: 800 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 32, x: 16, height: 36, width: 320 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 118, x: 16, height: 18, width: 220 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 144, x: 48, height: 18, width: 300 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 170, x: 16, height: 18, width: 220 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 196, x: 56, height: 18, width: 120 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 196, x: 200, height: 18, width: 48 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 222, x: 16, height: 18, width: 300 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 248, x: 16, height: 18, width: 500 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 274, x: 16, height: 18, width: 470 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 300, x: 70, height: 18, width: 450 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 326, x: 32, height: 18, width: 300 }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { rx: 4, ry: 4, y: 352, x: 16, height: 18, width: 250 })))) : (this.props.wikiPost ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_WikiPost__WEBPACK_IMPORTED_MODULE_7__["default"], { post: this.props.wikiPost })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "No Wiki post selected."))))));
    };
    return Wiki;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    wikiGroups: state.wiki.groups,
    wikiPosts: state.wiki.posts,
    wikiGroup: state.wiki.group,
    wikiPost: state.wiki.post
}); };
var mapDispatchToProps = {
    createWikiGroup: _actions_wikiActions__WEBPACK_IMPORTED_MODULE_5__["createWikiGroup"],
    createWikiPost: _actions_wikiActions__WEBPACK_IMPORTED_MODULE_5__["createWikiPost"],
    fetchWikiGroupPosts: _actions_wikiActions__WEBPACK_IMPORTED_MODULE_5__["fetchWikiGroupPosts"],
    fetchWikiGroups: _actions_wikiActions__WEBPACK_IMPORTED_MODULE_5__["fetchWikiGroups"],
    fetchWikiPost: _actions_wikiActions__WEBPACK_IMPORTED_MODULE_5__["fetchWikiPost"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Wiki));


/***/ }),

/***/ "JAFx":
/*!***********************************************!*\
  !*** ./resources/src/reducers/wikiReducer.ts ***!
  \***********************************************/
/*! exports provided: wikiReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wikiReducer", function() { return wikiReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialSate = {
    post: null,
    group: null,
    posts: [],
    groups: []
};
var wikiReducer = function (state, action) {
    if (state === void 0) { state = initialSate; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["CREATE_WIKI_GROUP"]:
            return __assign({}, state, { groups: state.groups.concat([action.payload]), group: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["CREATE_WIKI_POST"]:
            return __assign({}, state, { posts: state.posts.concat([action.payload]), post: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_WIKI_GROUP_POSTS"]:
            return __assign({}, state, { posts: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_WIKI_GROUPS"]:
            return __assign({}, state, { groups: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_WIKI_POST"]:
            return __assign({}, state, { post: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_WIKI_GROUP"]:
            return state;
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_WIKI_POST"]:
            return state;
        default:
            return state;
    }
};


/***/ }),

/***/ "JfGg":
/*!**************************************************!*\
  !*** ./resources/src/components/Views/Staff.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_staffActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/staffActions */ "XGI3");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Modals_StaffInfoDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Modals/StaffInfoDialog */ "z4zl");
/* harmony import */ var _Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Table/EnhancedTable */ "0q+F");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var Staff = /** @class */ (function (_super) {
    __extends(Staff, _super);
    function Staff() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            staff: [],
            addDialogOpen: false,
            loading: false
        };
        _this.onAddDialogOpen = function () {
            _this.setState({ addDialogOpen: true });
        };
        _this.onAddDialogClose = function () {
            _this.setState({ addDialogOpen: false });
        };
        _this.handleAddStaffSubmit = function (event, staffDetails, password) {
            event.preventDefault();
            return _this.props.createStaff(staffDetails, password)
                .then(function () {
                _this.props.queueSnackbar({
                    message: 'Staff created.',
                    links: [{ value: 'See Profile', to: "/staff/" + _this.props.newStaff.id }]
                });
            });
        };
        return _this;
    }
    Staff.prototype.componentDidMount = function () {
        var _this = this;
        document.title = 'Staff - Spotlight';
        this.setState({ loading: true });
        this.props.fetchStaff().then(function (res) {
            _this.setState({ loading: false });
        });
    };
    Staff.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.newStaff && !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(nextProps.newStaff)) {
            this.props.staff.unshift(nextProps.newStaff);
        }
    };
    Staff.prototype.render = function () {
        var _this = this;
        var staff = this.props.staff.map(function (staffUser, index) {
            return {
                id: index,
                last_name: staffUser.last_name,
                first_name: staffUser.first_name,
                email: staffUser.email,
                profile: staffUser.id
            };
        });
        var columns = [
            {
                id: 'last_name',
                label: 'Last Name',
                th: true,
                isNumeric: false,
                disablePadding: true,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First Name',
                disablePadding: true,
                th: true,
                isNumeric: false,
                filterable: true,
                searchable: true,
                visible: true
            },
            {
                id: 'email',
                label: 'Email',
                disablePadding: true,
                th: true,
                isNumeric: false,
                filterable: true,
                searchable: true,
                visible: true
            },
        ];
        var tableLink = { label: 'Profile', key: 'profile', path: 'staff' };
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content --content-inner', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_StaffInfoDialog__WEBPACK_IMPORTED_MODULE_6__["StaffInfoDialog"], { open: this.state.addDialogOpen, onClose: this.onAddDialogClose, onSubmit: this.handleAddStaffSubmit }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_7__["EnhancedTable"], { showEmptyTable: false, title: 'Staff', columns: columns, data: staff, searchable: true, loading: this.state.loading, link: tableLink },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Add Staff' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { onClick: function () { return _this.onAddDialogOpen(); } },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "add")))))));
    };
    return Staff;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    staff: state.staff.items,
    newStaff: state.staff.item
}); };
var mapDispatchToProps = {
    createStaff: _actions_staffActions__WEBPACK_IMPORTED_MODULE_4__["createStaff"],
    fetchStaff: _actions_staffActions__WEBPACK_IMPORTED_MODULE_4__["fetchStaff"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Staff));


/***/ }),

/***/ "K4P2":
/*!**************************************************!*\
  !*** ./resources/src/components/Views/Login.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_authActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/authActions */ "O7Nk");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/storage */ "k83H");
/* harmony import */ var _Banner_Banner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Banner/Banner */ "L3AU");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};









var selectBackground = function () {
    var imageList = [
        'brooke-cagle-609873-unsplash.jpg',
        'helloquence-61189-unsplash.jpg',
        'john-schnobrich-520023-unsplash.jpg',
        'mimi-thian-737711-unsplash.jpg',
        'priscilla-du-preez-293218-unsplash.jpg',
        'mika-korhonen-mKi1rfSQwVY-unsplash.jpg',
        'neonbrand-zFSo6bnZJTw-unsplash.jpg'
    ];
    var arrayIndex = Math.floor(Math.random() * imageList.length);
    return "static/images/splash/" + imageList[arrayIndex];
};
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            bannerOpen: true,
            boundingBoxDimension: { height: 0, width: 0 },
            error: null,
            helpDialogOpen: false,
            redirectToReferrer: false,
            loadingUsername: false,
            loadingPassword: false,
            imageURL: selectBackground(),
            imageStatus: 'loading',
            imageDimensions: { height: 0, width: 0 },
            loginState: 'password',
            rememberUser: false,
            authUsername: null,
            menuRef: null,
            user: '',
            password: ''
        };
        _this.handleBannerClose = function () {
            _this.setState({ bannerOpen: false });
        };
        _this.handleChange = function (event) {
            var _a;
            event.preventDefault();
            _this.setState((_a = {},
                _a[event.target.name] = event.target.value,
                _a.error = null,
                _a));
        };
        _this.handleHelpDialogOpen = function () {
            _this.setState({ helpDialogOpen: true });
        };
        _this.handleHelpDialogClose = function () {
            _this.setState({ helpDialogOpen: false });
        };
        _this.handleErrorCode = function (errorCode) {
            var loginError = null;
            switch (errorCode) {
                case 404:
                    loginError = {
                        type: 'username',
                        message: 'The user could not be found. Please check with your administrator.'
                    };
                    break;
                case 401:
                    loginError = {
                        type: 'password',
                        message: 'The given credentials were not correct.'
                    };
                    break;
                case 423:
                    loginError = {
                        type: 'password',
                        message: 'Your account has been locked. Please contact your administrator.'
                    };
                    break;
                case 500:
                default:
                    loginError = {
                        type: 'username',
                        message: 'The server encountered an error while logging you in. Please try again.'
                    };
            }
            if (loginError) {
                _this.setState({ error: loginError });
            }
        };
        /**
         * @TODO Combine these two handlers into one onSubmit function, captured by the <form onSubmit...>
         */
        _this.handleCheckUsername = function (event) {
            event.preventDefault();
            if (!_this.validateForm()) {
                return;
            }
            _this.setState({
                loadingUsername: true,
                bannerOpen: false
            });
            _this.props.checkUsername(_this.state.user)
                .then(function (res) {
                var authUsername = res.data;
                _this.setState({
                    authUsername: authUsername,
                    loadingUsername: false,
                    loginState: 'password'
                });
            }, function (error) {
                _this.handleErrorCode(error.response.status);
                _this.setState({ loadingUsername: false });
            });
        };
        _this.handleLogin = function (event) {
            event.preventDefault();
            if (!_this.validateForm()) {
                return;
            }
            _this.setState({
                loadingPassword: true,
                bannerOpen: false
            });
            var credentials = {
                username: _this.state.authUsername.username,
                password: _this.state.password
            };
            _this.props.login(credentials)
                .then(function () {
                _this.props.onSignIn()
                    .then(function () {
                    _this.props.onSignIn();
                    _this.setState({ redirectToReferrer: true });
                    if (_this.state.rememberUser) {
                        _this.rememberAuthUsername(_this.state.authUsername);
                    }
                }, function () {
                    var loginError = {
                        type: 'username',
                        message: 'Unable to download app settings. Please try again.'
                    };
                    _this.setState({
                        error: loginError,
                        loadingPassword: false
                    });
                });
            }, function (error) {
                _this.handleErrorCode(error.response.status);
                _this.setState({ loadingPassword: false });
            });
        };
        _this.validateForm = function () {
            if (_this.state.user.length === 0 && _this.state.loginState === 'username') {
                _this.setState({
                    error: { type: 'username', message: 'A username is required to log in.' }
                });
                return false;
            }
            if (_this.state.password.length === 0 && _this.state.loginState === 'password') {
                _this.setState({
                    error: { type: 'password', message: 'A password is required to log in.' }
                });
                return false;
            }
            return true;
        };
        _this.resetLoginState = function () {
            _this.setState({
                loginState: 'username',
                menuRef: null
            });
        };
        _this.handleImageLoad = function () {
            _this.setState({
                imageStatus: 'loaded',
                imageDimensions: {
                    height: _this.image.clientHeight,
                    width: _this.image.clientWidth
                },
                boundingBoxDimension: {
                    height: _this.boundingBox.clientHeight,
                    width: _this.boundingBox.clientWidth
                }
            });
            _this.props.onImageLoad();
        };
        _this.toggleRememberUser = function () {
            _this.setState(function (state) { return ({
                rememberUser: !state.rememberUser
            }); });
        };
        _this.rememberAuthUsername = function (authUsername) {
            var otherAuthUsernames = _this.rememberUsers ? (_this.rememberUsers.filter(function (rememberUser) {
                return rememberUser.username !== authUsername.username;
            })) : [];
            var newAuthUsers = [authUsername].concat(otherAuthUsernames);
            _this.rememberUsers = newAuthUsers;
            Object(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["writeObjectToLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["REMEMBER_USERS"], newAuthUsers);
        };
        _this.forgetAuthUsername = function (authUsername) {
            var otherAuthUsernames = _this.rememberUsers ? (_this.rememberUsers.filter(function (rememberUser) {
                return rememberUser.username !== authUsername.username;
            })) : [];
            _this.rememberUsers = otherAuthUsernames;
            Object(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["writeObjectToLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["REMEMBER_USERS"], otherAuthUsernames);
            if (!(_this.rememberUsers && _this.rememberUsers.length)) {
                _this.resetLoginState();
            }
            else if (_this.state.authUsername.username === authUsername.username) {
                _this.setState({ authUsername: otherAuthUsernames[0] });
            }
            else {
                _this.forceUpdate();
            }
        };
        _this.handleOpenMenu = function (event) {
            _this.setState({ menuRef: event.currentTarget });
        };
        _this.handleCloseMenu = function () {
            _this.setState({ menuRef: null });
        };
        _this.handleClickAuthUsername = function (authUsername) {
            _this.setState({
                authUsername: authUsername,
                loginState: 'password',
                menuRef: null
            });
        };
        _this.rememberUserListItem = function (rememberUser, removable) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { className: 'auth-username__list-item', key: rememberUser.username, onClick: function () { return _this.handleClickAuthUsername(rememberUser); }, dense: true },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('login_avatar', "--" + rememberUser.color) }, rememberUser.initials),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItemText"], null, rememberUser.username),
            removable !== false && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { onClick: function () { return _this.forgetAuthUsername(rememberUser); } },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "delete"))))); };
        return _this;
    }
    Login.prototype.componentDidMount = function () {
        document.title = 'Spotlight - Login';
        this.rememberUsers = Object(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["getObjectFromLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_6__["REMEMBER_USERS"]);
        if (this.rememberUsers && this.rememberUsers.length > 0) {
            this.setState({ authUsername: this.rememberUsers[0] });
        }
        else {
            this.setState({ loginState: 'username' });
        }
    };
    Login.prototype.render = function () {
        var _a;
        var _this = this;
        var from = (this.props.location.state || { from: { pathname: '/' } }).from;
        if (this.state.redirectToReferrer) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], { to: from });
        }
        var schoolName = this.props.settings.values && this.props.settings.values['school_name']
            ? this.props.settings.values['school_name'].value
            : undefined;
        var schoolLogo = this.props.settings.values && this.props.settings.values['school_logo']
            ? this.props.settings.values['school_logo'].value
            : undefined;
        var isVertical = this.state.imageDimensions.width < this.state.boundingBoxDimension.width;
        var isRemembered = this.rememberUsers && this.rememberUsers.some(function (rememberUser) {
            return _this.state.authUsername.username === rememberUser.username;
        });
        var bannerProps = null;
        if (this.props.authState === 'failed-settings') {
            bannerProps = {
                icon: 'warning',
                message: 'The server encountered an error while signing in. Please try again.'
            };
        }
        else if (this.props.authState === 'unauthenticated') {
            bannerProps = {
                icon: 'lock',
                message: 'Your session has expired. Please sign back in to continue.'
            };
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            bannerProps && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Banner_Banner__WEBPACK_IMPORTED_MODULE_7__["Banner"], __assign({}, bannerProps, { variant: 'dynamic', open: this.state.bannerOpen, onClose: this.handleBannerClose }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'login' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'login__image_container', ref: function (boundingBox) { return _this.boundingBox = boundingBox; } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('login_image', (_a = {}, _a['--vertical'] = isVertical, _a)), src: this.state.imageURL, onLoad: this.handleImageLoad, ref: function (image) { return _this.image = image; } })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'login__panel' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'login_container' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Smart attendance for the internet age."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: 'https://focustime.ca', className: 'subtitle_link' }, "Start using powerful tools that let your self directed study blocks succeed."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Paper"], { className: 'login_form' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'logos-container' },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: 'ft-logo', src: '/static/images/ft-badge.png' }),
                                    (schoolName && schoolLogo) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'cross' }, "\u00D7"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'school_logo' },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "/static/images/logos/" + schoolLogo }),
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, schoolName))))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Sign in to Spotlight"),
                                (this.state.authUsername || (this.rememberUsers && this.rememberUsers.length > 0)) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { className: 'auth-username', onClick: this.handleOpenMenu },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'auth-username__inner' },
                                            this.state.loginState === 'password' && this.state.authUsername ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('login_avatar', "--" + this.state.authUsername.color) }, this.state.authUsername.initials),
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], null, this.state.authUsername.username))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], null, "Sign in with Username")),
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "expand_more"))),
                                    (this.state.loginState === 'password' || (this.rememberUsers && this.rememberUsers.length > 0)) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Menu"], { open: Boolean(this.state.menuRef), anchorEl: this.state.menuRef, anchorOrigin: { horizontal: 'center', vertical: 'top' }, transformOrigin: { vertical: 'top', horizontal: 'center' }, onClose: this.handleCloseMenu },
                                        (!isRemembered && this.state.authUsername) && (this.rememberUserListItem(this.state.authUsername, false)),
                                        (this.rememberUsers && this.rememberUsers.length) && (this.rememberUsers.map(function (rememberUser) { return _this.rememberUserListItem(rememberUser); })),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { onClick: function () { return _this.resetLoginState(); } }, "Sign in with Username"))))),
                                this.state.loginState === 'username' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["TextField"], { name: 'user', type: 'text', label: 'Email or Student Number', error: this.state.error && this.state.error.type === 'username', helperText: this.state.error && this.state.error.type === 'username'
                                            ? this.state.error.message
                                            : undefined, value: this.state.user, onChange: this.handleChange, margin: 'normal', variant: 'filled', autoFocus: true, fullWidth: true }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControlLabel"], { label: 'Remember me', control: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Checkbox"], { onChange: function () { return _this.toggleRememberUser(); }, checked: this.state.rememberUser, color: 'primary' }) }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["DialogActions"], null,
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_8__["LoadingButton"], { type: 'submit', onClick: this.handleCheckUsername, color: 'primary', variant: 'contained', loading: this.state.loadingUsername }, "Next")))),
                                this.state.loginState === 'password' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["TextField"], { name: 'password', type: 'password', label: 'Password', error: this.state.error && this.state.error.type === 'password', helperText: this.state.error && this.state.error.type === 'password'
                                            ? this.state.error.message
                                            : undefined, value: this.state.password, onChange: this.handleChange, margin: 'normal', variant: 'filled', autoFocus: true, fullWidth: true }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["DialogActions"], null,
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_8__["LoadingButton"], { type: 'submit', onClick: this.handleLogin, color: 'primary', variant: 'contained', loading: this.state.loadingPassword }, "Sign In")))))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: 'links_list' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: 'https://focustime.ca' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "Learn More"))))))));
    };
    return Login;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    settings: state.settings.items
}); };
var mapDispatchToProps = { login: _actions_authActions__WEBPACK_IMPORTED_MODULE_5__["login"], checkUsername: _actions_authActions__WEBPACK_IMPORTED_MODULE_5__["checkUsername"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Login));


/***/ }),

/***/ "KpP2":
/*!*****************************************************!*\
  !*** ./resources/src/components/Views/NotFound.tsx ***!
  \*****************************************************/
/*! exports provided: NotFound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFound", function() { return NotFound; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../EmptyStateIcon */ "iea3");




var NotFound = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content', id: 'content' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'not-found' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_3__["EmptyStateIcon"], { variant: 'not-found' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null,
                    "No match for ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, props.path || props.location.pathname)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "The item you're looking for may have been moved, renamed or deleted."),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: '/' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'contained', color: 'primary' }, "Back to Dashboard"))))));
};


/***/ }),

/***/ "Kpek":
/*!******************************************************************!*\
  !*** ./resources/src/components/Calendar/CalendarDialogItem.tsx ***!
  \******************************************************************/
/*! exports provided: CalendarDialogItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarDialogItem", function() { return CalendarDialogItem; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/LoadingIconButton */ "x2q7");
/* harmony import */ var _Form_LoadingMenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/LoadingMenuItem */ "2Cd6");






var CalendarDialogItem = function (props) {
    var _a, _b;
    var _c = props.details, id = _c.id, variant = _c.variant, time = _c.time, title = _c.title, memo = _c.memo, method = _c.method;
    var methodDetails = method ? Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["getMethodDetailsFromName"])(method) : null;
    var clickable = Boolean(props.onClick);
    var _d = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(null), menuRef = _d[0], setMenuRef = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState([]), loadingActions = _e[0], setLoadingActions = _e[1];
    var setLoading = function (index) {
        setLoadingActions(loadingActions.concat([index]));
    };
    var unsetLoading = function (index) {
        setLoadingActions(loadingActions.filter(function (loadingAction) { return loadingAction !== index; }));
    };
    var handleClickMenu = function (event) {
        setMenuRef(event.currentTarget);
    };
    var handleActionCallback = function (action, index) {
        var callback = action.callback, closeOnCallback = action.closeOnCallback;
        setLoading(index);
        callback()
            .then(function () {
            unsetLoading(index);
            if (closeOnCallback) {
                props.onCloseDialog();
            }
            handleClose();
        })
            .catch(function () {
            unsetLoading(index);
        });
    };
    var handleClose = function () {
        setMenuRef(null);
    };
    var handleClick = function (onClick) {
        if (props.disabled || props.unavailable) {
            return;
        }
        onClick();
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('calendar_item', 'calendar_item__container', "--" + variant, (_a = {}, _a['--selectable'] = clickable, _a), (_b = {}, _b['--disabled'] = props.disabled || props.unavailable, _b)), key: id, onClick: clickable ? function () { return handleClick(props.onClick); } : undefined },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h6", { className: 'calendar_item__title' },
                title,
                time && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'calendar_item__time' },
                    time,
                    methodDetails && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { className: 'icon', title: methodDetails.title },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, methodDetails.icon)))))),
            memo && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'calendar_item__memo' },
                props.unavailable && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Teacher is Unavailable' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "block"))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, memo)))),
        (props.actions && props.actions.length > 0) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'calendar_item__actions' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_4__["LoadingIconButton"], { onClick: handleClickMenu, loading: props.loading === true },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "more_vert")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Menu"], { anchorEl: menuRef, open: Boolean(menuRef), onClose: function () { return handleClose(); } }, props.actions.map(function (action, index) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingMenuItem__WEBPACK_IMPORTED_MODULE_5__["LoadingMenuItem"], { key: action.value, onClick: function () { return handleActionCallback(action, index); }, loading: loadingActions.indexOf(index) !== -1 }, action.value)); }))))));
};


/***/ }),

/***/ "L3AU":
/*!****************************************************!*\
  !*** ./resources/src/components/Banner/Banner.tsx ***!
  \****************************************************/
/*! exports provided: Banner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Banner", function() { return Banner; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _BannerContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BannerContent */ "qDVX");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




var Banner = /** @class */ (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Banner.prototype.render = function () {
        var _a, _b;
        var _c = this.props, actions = _c.actions, message = _c.message, icon = _c.icon, open = _c.open, onClose = _c.onClose, transitionProps = __rest(_c, ["actions", "message", "icon", "open", "onClose"]);
        var Content = function () { return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_BannerContent__WEBPACK_IMPORTED_MODULE_3__["BannerContent"], { actions: actions, message: message, icon: icon, onClose: onClose }); };
        return this.props.variant === 'static' ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Collapse"], __assign({ in: open }, transitionProps),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('banner', (_a = {}, _a['--icon'] = icon, _a)) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Content, null)))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Slide"], __assign({ in: open, direction: 'down' }, transitionProps),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('banner', ' --dynamic', (_b = {}, _b['--icon'] = icon, _b)) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], { elevation: 5 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Content, null)))));
    };
    return Banner;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "LBOG":
/*!******************************************************!*\
  !*** ./resources/src/components/Sidebar/NavItem.tsx ***!
  \******************************************************/
/*! exports provided: NavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavItem", function() { return NavItem; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");




var NavItem = function (props) {
    var content = props.icon ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, props.icon) : props.children;
    var button = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('nav_button', props.className), onClick: props.onClick }, props.badgeCount ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Badge"], { badgeContent: props.badgeCount || 0, color: 'secondary', max: 9, invisible: props.badgeCount === 0 }, content)) : (content)));
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: props.title, placement: 'right' }, props.to ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: props.to }, button) : button));
};


/***/ }),

/***/ "M3bm":
/*!***********************************************************!*\
  !*** ./resources/src/components/Sidebar/SearchWidget.tsx ***!
  \***********************************************************/
/*! exports provided: SearchWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchWidget", function() { return SearchWidget; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../EmptyStateIcon */ "iea3");
/* harmony import */ var _Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Sidebar/NavItem */ "LBOG");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var searchGroups = [
    { value: 'students', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'courses', label: 'Courses' },
    { value: 'clusters', label: 'Clusters' },
];
var emptySearchResults = {
    students: [],
    staff: [],
    courses: [],
    clusters: []
};
var SearchWidget = /** @class */ (function (_super) {
    __extends(SearchWidget, _super);
    function SearchWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: false,
            loading: false,
            searchQuery: '',
            searchResults: emptySearchResults
        };
        _this.handleClickOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        _this.handleChange = function (event) {
            _this.setState({ searchQuery: event.target.value }, function () {
                _this.search(_this.state.searchQuery);
            });
        };
        _this.search = function (query) {
            if (query.length > 0) {
                _this.setState({ loading: true }, function () {
                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/search?query=" + query)
                        .then(function (res) {
                        // Wait to show results until the query matches what was typed in.
                        if (res.data.query === _this.state.searchQuery) {
                            var results = res.data.results;
                            _this.setState({
                                searchResults: results,
                                loading: false
                            });
                        }
                    });
                });
            }
            else {
                _this.setState({
                    searchResults: emptySearchResults,
                    loading: false
                });
            }
        };
        _this.escFunction = function (event) {
            if (event.keyCode === 27) {
                _this.setState({ open: false });
            }
        };
        _this.escFunction = _this.escFunction.bind(_this);
        return _this;
    }
    SearchWidget.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.escFunction, false);
    };
    SearchWidget.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.escFunction, false);
    };
    SearchWidget.prototype.render = function () {
        var _this = this;
        var resultCount = this.state.searchResults ? (searchGroups.reduce(function (count, itemGroup) {
            return count + _this.state.searchResults[itemGroup.value].length;
        }, 0)) : 0;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_6__["NavItem"], { title: 'Search', icon: 'search', onClick: this.handleClickOpen }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Drawer"], { open: this.state.open },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal search_modal items_modal' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal__header' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { className: 'button_back', onClick: this.handleClose },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "arrow_back")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["TextField"], { name: 'search', type: 'text', placeholder: 'Search Spotlight', value: this.state.searchQuery, onChange: this.handleChange, margin: 'normal', variant: 'standard', autoFocus: true, fullWidth: true, autoComplete: 'off' })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal__content items_modal__content' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Grow"], { in: !this.state.loading && resultCount > 0, timeout: { enter: 200, exit: 0 } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'content-inner' }, searchGroups
                                .filter(function (searchGroup) { return (_this.state.searchResults[searchGroup.value].length > 0); })
                                .map(function (searchGroup) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", { className: 'items-group_header' }, searchGroup.label),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["List"], { className: 'items-group_list' }, _this.state.searchResults[searchGroup.value]
                                    .map(function (item, index) {
                                    var url;
                                    var value;
                                    switch (searchGroup.value) {
                                        case 'students':
                                            value = item.first_name + " " + item.last_name;
                                            url = "/students/" + item.id;
                                            break;
                                        case 'staff':
                                            value = item.title + " " + item.last_name + ", " + item.first_name;
                                            url = "/staff/" + item.id;
                                            break;
                                        case 'courses':
                                            value = item.name;
                                            url = "/courses/" + item.short_name;
                                            break;
                                        case 'clusters':
                                            value = item.name;
                                            url = "/clusters/" + item.id;
                                            break;
                                    }
                                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { key: index, to: url, onClick: _this.handleClose },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItem"], { className: 'items-group_list__item' }, value)));
                                })))); }))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Fade"], { in: this.state.loading, timeout: { enter: 200, exit: 0 } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'items_modal__content-loader' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { width: 500, height: 436 },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '0', rx: '4', ry: '4', height: '24', width: '96' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '40', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '84', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '128', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '180', rx: '4', ry: '4', height: '24', width: '160' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '220', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '264', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '308', rx: '4', ry: '4', height: '36', width: '400' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '360', rx: '4', ry: '4', height: '24', width: '80' }),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '64', y: '400', rx: '4', ry: '4', height: '36', width: '400' })))),
                        !this.state.loading && resultCount === 0 && this.state.searchQuery.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_5__["EmptyStateIcon"], { variant: 'search' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "No search results found"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Try again searching something else."))))))));
    };
    return SearchWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "MAQM":
/*!**************************************************************!*\
  !*** ./resources/src/components/Calendar/CalendarDialog.tsx ***!
  \**************************************************************/
/*! exports provided: CalendarDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarDialog", function() { return CalendarDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Modals_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modals/EnhancedDialogTitle */ "ePNl");
/* harmony import */ var _CalendarDialogItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CalendarDialogItem */ "Kpek");





var CalendarDialog = function (props) {
    var handleClose = function () {
        props.onClose();
    };
    var _a = props.blockDetails, date = _a.date, end = _a.end, flex = _a.flex, label = _a.label, pending = _a.pending, start = _a.start;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open, className: 'calendar-block-dialog' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_3__["EnhancedDialogTitle"], { className: 'calendar-block-dialog__title', onClose: handleClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", { className: 'label' },
                label || 'Unlaballed Block',
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, start + " - " + end)),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", { className: 'date' }, date)),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null, props.calendarDialogGroups && props.calendarDialogGroups.length > 0 ? (props.calendarDialogGroups.map(function (calendarGroup) {
            var hasEmptyState = Boolean(calendarGroup.emptyState);
            var hasData = calendarGroup.keys.some(function (key) {
                return props.blockDetails.data[key] && props.blockDetails.data[key].length > 0;
            });
            if (!hasData && !hasEmptyState) {
                return null;
            }
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { key: calendarGroup.name },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", { className: 'section-header' }, calendarGroup.name),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", { className: 'section' },
                    !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(props.blockDetails.data) ? (hasData ? (calendarGroup.keys.map(function (groupKey, keyIndex) { return (props.blockDetails.data[groupKey].map(function (data, index) {
                        var itemMap = calendarGroup.itemMaps[keyIndex];
                        if (!itemMap) {
                            return;
                        }
                        var itemDetails = itemMap(data, props.blockDetails);
                        var actions = calendarGroup.actions ? (calendarGroup.actions(data, props.blockDetails)) : undefined;
                        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CalendarDialogItem__WEBPACK_IMPORTED_MODULE_4__["CalendarDialogItem"], { details: itemDetails, actions: actions, key: index, onCloseDialog: handleClose }),
                            calendarGroup.children && (calendarGroup.children(data, props.blockDetails)));
                    })); })) : (!calendarGroup.children && calendarGroup.emptyState(props.blockDetails))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'empty_text' }, "No data available")),
                    calendarGroup.child && (calendarGroup.child(props.blockDetails)))));
        })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'empty_text' }, "Nothing to show"))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: function () { return handleClose(); } }, "Close"))));
};


/***/ }),

/***/ "N0Au":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/sass-loader/dist/cjs.js??ref--7-2!./resources/src/assets/styles/main.scss ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "JPst")(true);
// Module
exports.push([module.i, "/* Main */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: 'Segoe UI', 'Roboto', sans-serif; }\n\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\na {\n  text-decoration: none;\n  color: inherit; }\n  a:hover, a:active, a:focus {\n    outline: none; }\n\nh1, h2, h3, h4, h5, h6, p {\n  margin: 0 0 8px 0; }\n\n.colors_dialog .color__swatch.--red,\n.topics_dialog .color_swatch.--red,\n.nav_avatar.--red,\n.student_avatar.--red,\n.profile_avatar.--red,\n.chip_avatar.--red,\n.login_avatar.--red {\n  background: #c62828; }\n\n.colors_dialog .color__swatch.--pink,\n.topics_dialog .color_swatch.--pink,\n.nav_avatar.--pink,\n.student_avatar.--pink,\n.profile_avatar.--pink,\n.chip_avatar.--pink,\n.login_avatar.--pink {\n  background: #ad1457; }\n\n.colors_dialog .color__swatch.--purple,\n.topics_dialog .color_swatch.--purple,\n.nav_avatar.--purple,\n.student_avatar.--purple,\n.profile_avatar.--purple,\n.chip_avatar.--purple,\n.login_avatar.--purple {\n  background: #6a1b9a; }\n\n.colors_dialog .color__swatch.--deep-purple,\n.topics_dialog .color_swatch.--deep-purple,\n.nav_avatar.--deep-purple,\n.student_avatar.--deep-purple,\n.profile_avatar.--deep-purple,\n.chip_avatar.--deep-purple,\n.login_avatar.--deep-purple {\n  background: #4527a0; }\n\n.colors_dialog .color__swatch.--indigo,\n.topics_dialog .color_swatch.--indigo,\n.nav_avatar.--indigo,\n.student_avatar.--indigo,\n.profile_avatar.--indigo,\n.chip_avatar.--indigo,\n.login_avatar.--indigo {\n  background: #283593; }\n\n.colors_dialog .color__swatch.--blue,\n.topics_dialog .color_swatch.--blue,\n.nav_avatar.--blue,\n.student_avatar.--blue,\n.profile_avatar.--blue,\n.chip_avatar.--blue,\n.login_avatar.--blue {\n  background: #1565c0; }\n\n.colors_dialog .color__swatch.--light-blue,\n.topics_dialog .color_swatch.--light-blue,\n.nav_avatar.--light-blue,\n.student_avatar.--light-blue,\n.profile_avatar.--light-blue,\n.chip_avatar.--light-blue,\n.login_avatar.--light-blue {\n  background: #0277bd; }\n\n.colors_dialog .color__swatch.--cyan,\n.topics_dialog .color_swatch.--cyan,\n.nav_avatar.--cyan,\n.student_avatar.--cyan,\n.profile_avatar.--cyan,\n.chip_avatar.--cyan,\n.login_avatar.--cyan {\n  background: #00838f; }\n\n.colors_dialog .color__swatch.--teal,\n.topics_dialog .color_swatch.--teal,\n.nav_avatar.--teal,\n.student_avatar.--teal,\n.profile_avatar.--teal,\n.chip_avatar.--teal,\n.login_avatar.--teal {\n  background: #00695c; }\n\n.colors_dialog .color__swatch.--green,\n.topics_dialog .color_swatch.--green,\n.nav_avatar.--green,\n.student_avatar.--green,\n.profile_avatar.--green,\n.chip_avatar.--green,\n.login_avatar.--green {\n  background: #2e7d32; }\n\n.colors_dialog .color__swatch.--light-green,\n.topics_dialog .color_swatch.--light-green,\n.nav_avatar.--light-green,\n.student_avatar.--light-green,\n.profile_avatar.--light-green,\n.chip_avatar.--light-green,\n.login_avatar.--light-green {\n  background: #558b2f; }\n\n.colors_dialog .color__swatch.--lime,\n.topics_dialog .color_swatch.--lime,\n.nav_avatar.--lime,\n.student_avatar.--lime,\n.profile_avatar.--lime,\n.chip_avatar.--lime,\n.login_avatar.--lime {\n  background: #9e9d24; }\n\n.colors_dialog .color__swatch.--yellow,\n.topics_dialog .color_swatch.--yellow,\n.nav_avatar.--yellow,\n.student_avatar.--yellow,\n.profile_avatar.--yellow,\n.chip_avatar.--yellow,\n.login_avatar.--yellow {\n  background: #f9a825; }\n\n.colors_dialog .color__swatch.--amber,\n.topics_dialog .color_swatch.--amber,\n.nav_avatar.--amber,\n.student_avatar.--amber,\n.profile_avatar.--amber,\n.chip_avatar.--amber,\n.login_avatar.--amber {\n  background: #ff8f00; }\n\n.colors_dialog .color__swatch.--orange,\n.topics_dialog .color_swatch.--orange,\n.nav_avatar.--orange,\n.student_avatar.--orange,\n.profile_avatar.--orange,\n.chip_avatar.--orange,\n.login_avatar.--orange {\n  background: #ef6c00; }\n\n.colors_dialog .color__swatch.--deep-orange,\n.topics_dialog .color_swatch.--deep-orange,\n.nav_avatar.--deep-orange,\n.student_avatar.--deep-orange,\n.profile_avatar.--deep-orange,\n.chip_avatar.--deep-orange,\n.login_avatar.--deep-orange {\n  background: #d84315; }\n\n.colors_dialog .color__swatch.--brown,\n.topics_dialog .color_swatch.--brown,\n.nav_avatar.--brown,\n.student_avatar.--brown,\n.profile_avatar.--brown,\n.chip_avatar.--brown,\n.login_avatar.--brown {\n  background: #4e342e; }\n\n.colors_dialog .color__swatch.--blue-grey,\n.topics_dialog .color_swatch.--blue-grey,\n.nav_avatar.--blue-grey,\n.student_avatar.--blue-grey,\n.profile_avatar.--blue-grey,\n.chip_avatar.--blue-grey,\n.login_avatar.--blue-grey {\n  background: #37474f; }\n\n.colors_dialog .color__swatch.--black,\n.topics_dialog .color_swatch.--black,\n.nav_avatar.--black,\n.student_avatar.--black,\n.profile_avatar.--black,\n.chip_avatar.--black,\n.login_avatar.--black {\n  background: black; }\n\n.chip_avatar {\n  color: rgba(255, 255, 255, 0.87) !important; }\n\n/* Layout */\n.site-wrap {\n  display: flex; }\n  .site-wrap .sidebar:hover .sidebar__nav:not(:hover) ~ .sidebar__menu {\n    width: 260px;\n    padding: 0 2px;\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n  .site-wrap.--menu_open .sidebar {\n    width: 328px; }\n    .site-wrap.--menu_open .sidebar .sidebar__menu {\n      width: 260px;\n      padding: 0 0 0 2px;\n      box-shadow: none !important; }\n\n.--flex-row {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center; }\n  .--flex-row > * + * {\n    margin-left: 8px !important; }\n\n.sysadmin_badge {\n  width: 24px;\n  height: 24px;\n  padding: 4px;\n  box-sizing: border-box;\n  display: inline-block;\n  margin: 0 8px;\n  background: #EEE;\n  border-radius: 50%; }\n  .sysadmin_badge::after {\n    content: \"\";\n    background: url(\"/static/images/ft-badge.png\") no-repeat;\n    background-position: center;\n    background-size: cover;\n    width: 16px;\n    height: 16px;\n    display: block; }\n\n.drawer {\n  background: #EEE;\n  position: fixed;\n  z-index: 300;\n  top: 0;\n  right: -236px;\n  width: 260px;\n  height: 100vh;\n  padding: 16px 24px;\n  box-sizing: border-box;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  transition-duration: 0.2s;\n  transition-property: right; }\n  .drawer.--open ~ .content {\n    margin-right: 260px; }\n  .drawer.--open, .drawer:hover {\n    right: 0; }\n  .drawer__topbar {\n    height: 48px;\n    padding: 0 0 016px;\n    box-sizing: content-box;\n    border-bottom: 1px solid #DDD;\n    margin-bottom: 16px; }\n    .drawer__topbar > * {\n      line-height: 48px !important; }\n  .drawer__loading {\n    position: absolute;\n    top: calc(50% + 64px);\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%); }\n\n.report_name_widget {\n  padding: 8px 0;\n  position: relative; }\n  .report_name_widget__input {\n    font: inherit;\n    padding: 8px 0;\n    margin: -2px;\n    min-width: 12px; }\n  .report_name_widget__hidden {\n    position: absolute;\n    height: 0;\n    overflow: hidden;\n    white-space: pre; }\n  .report_name_widget__helper {\n    position: absolute;\n    left: 0;\n    top: 56px;\n    color: #f44336 !important; }\n  .report_name_widget.--edit {\n    padding: 0; }\n  .report_name_widget.--error,\n  .report_name_widget.--error input, .report_name_widget__helper {\n    width: 200px !important; }\n\n.dialog-title__content {\n  height: 64px;\n  width: 600px;\n  box-sizing: border-box;\n  padding: 16px 24px;\n  line-height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between; }\n\n.dialog-title .icon-close {\n  margin-left: 16px; }\n\n.dialog-title h3 {\n  margin: 0; }\n\n.dialog-title.--close-button .dialog-title__content {\n  padding: 16px 16px 16px 24px; }\n\n.dialog-form__row {\n  display: flex; }\n  .dialog-form__row > * + * {\n    margin-left: 8px !important; }\n\n.clusters-dialog .dialog-title {\n  width: unset; }\n\n.stepper-actions > * + * {\n  margin-left: 8px !important; }\n\n.button-container {\n  position: relative;\n  display: inline-block; }\n  .button-container .button-progress {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -12px;\n    margin-left: -12px; }\n\n.menu-item-container {\n  position: relative;\n  display: block;\n  padding-left: 0;\n  transition: padding 0.2s; }\n  .menu-item-container.--loading {\n    padding-left: 32px; }\n  .menu-item-container .menu-item-progress {\n    position: absolute;\n    top: 50%;\n    left: 28px;\n    margin-top: -12px;\n    margin-left: -12px; }\n\n.chips_container {\n  display: flex;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n  margin-bottom: 8px; }\n  .chips_container > * {\n    margin: 4px; }\n\n.change_password_card {\n  text-align: left;\n  max-width: 600px; }\n\n.check-in_error_header {\n  font-size: 16px; }\n\n.check-in_error {\n  font-weight: 500;\n  color: #888;\n  font-family: monospace; }\n\n.password_confirm_dialog_list {\n  padding-left: 32px;\n  list-style: initial;\n  margin-bottom: 8px; }\n\n.info_tooltip {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; }\n  .info_tooltip > * + * {\n    margin: 0 8px; }\n  .info_tooltip span {\n    color: rgba(0, 0, 0, 0.3); }\n\n.login {\n  width: 100%;\n  height: 100vh;\n  color: rgba(255, 255, 255, 0.87);\n  display: grid;\n  grid-template-columns: 2fr 1fr; }\n  .login__image_container {\n    width: 100%;\n    position: relative;\n    overflow: hidden; }\n    .login__image_container .login_image {\n      position: absolute;\n      height: 100%;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%); }\n      .login__image_container .login_image.--vertical {\n        height: unset;\n        width: 100%; }\n  .login__panel {\n    background: #034670;\n    height: 100vh;\n    position: relative;\n    min-width: 490px; }\n    .login__panel .ft-logo {\n      height: 48px;\n      width: 48px; }\n    .login__panel .logos-container {\n      height: 48px;\n      margin: 0 auto 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n      .login__panel .logos-container .cross {\n        font-size: 32px;\n        line-height: 16px;\n        display: inline-table;\n        margin: 0 8px;\n        font-weight: 400;\n        color: #DDD; }\n    .login__panel .login_container {\n      width: 360px;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%); }\n      .login__panel .login_container h2 {\n        margin: 0 0 16px 0; }\n      .login__panel .login_container .school_logo {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: center;\n        line-height: 24px; }\n        .login__panel .login_container .school_logo img {\n          margin-right: 8px;\n          height: 48px; }\n        .login__panel .login_container .school_logo h3 {\n          font-weight: 500;\n          margin: 0; }\n      .login__panel .login_container .subtitle_link {\n        margin: 0 0 16px 0;\n        color: rgba(225, 225, 225, 0.86);\n        font-weight: 700; }\n        .login__panel .login_container .subtitle_link:hover {\n          text-decoration: underline; }\n      .login__panel .login_container .login_form {\n        padding: 32px;\n        margin: 32px 0 16px; }\n        .login__panel .login_container .login_form h2 {\n          font-weight: 400;\n          text-align: center; }\n    .login__panel .links_list {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n      display: flex;\n      justify-content: flex-end; }\n      .login__panel .links_list li {\n        margin: 0 0 0 16px;\n        font-weight: 500; }\n  .login .auth-username {\n    display: block;\n    margin: 0 auto;\n    font-weight: 400 !important;\n    text-transform: unset !important; }\n    .login .auth-username__inner {\n      display: flex;\n      align-items: center;\n      text-transform: inherit; }\n      .login .auth-username__inner > * + * {\n        margin-left: 8px; }\n\n.login_avatar {\n  width: 32px !important;\n  height: 32px !important;\n  font-size: 14px !important; }\n\n.auth-username__list-item {\n  display: flex;\n  align-items: center; }\n  .auth-username__list-item > * + * {\n    margin-left: 4px !important; }\n\n.router_page {\n  position: absolute;\n  left: 0;\n  right: 0; }\n\n.fade-appear,\n.fade-enter {\n  opacity: 0;\n  z-index: 1; }\n\n.fade-appear-active,\n.fade-enter.fade-enter-active {\n  opacity: 1;\n  transition: opacity 300ms linear 150ms; }\n\n.fade-exit {\n  opacity: 1; }\n\n.fade-exit.fade-exit-active {\n  opacity: 0;\n  transition: opacity 150ms linear; }\n\n.slide-appear,\n.slide-enter {\n  transform: translate(100%, 0);\n  z-index: 1; }\n\n.slide-appear-active,\n.slide-enter.slide-enter-active {\n  transform: translate(0, 0);\n  transition-duration: 300ms;\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.2, 0, 0, 1); }\n\n.slide-exit {\n  opacity: 1; }\n\n.slide-exit.slide-exit-active {\n  transform: translate(-100%, 0);\n  transition-duration: 300ms;\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.2, 0, 0, 1); }\n\n/* Components */\n.about-spotlight {\n  text-align: center; }\n  .about-spotlight__logo {\n    width: 450px;\n    height: 64px;\n    background-image: url(\"/static/images/ft-logo.svg\");\n    background-repeat: no-repeat;\n    background-position: center;\n    margin-bottom: 16px; }\n  .about-spotlight__name {\n    margin: 8px 0 !important; }\n  .about-spotlight__version {\n    font-weight: 400; }\n    .about-spotlight__version span {\n      font-weight: 500; }\n\n.banner {\n  background: #FFF;\n  z-index: 100; }\n  .banner.--dynamic {\n    position: fixed; }\n    .banner.--dynamic .banner__content {\n      width: 100vw; }\n  .banner.--icon .banner__content {\n    padding: 16px 8px 8px 16px; }\n  .banner.--icon .banner__message {\n    margin-bottom: 8px; }\n  .banner__content {\n    width: 100%;\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: space-between;\n    box-sizing: border-box;\n    padding: 24px 8px 8px 24px; }\n  .banner__message {\n    display: flex;\n    align-items: center;\n    margin-bottom: 16px; }\n  .banner__actions {\n    padding-left: 90px;\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: flex-end; }\n    .banner__actions > * + * {\n      margin-left: 8px; }\n  .banner__avatar {\n    margin-right: 24px; }\n\n.calendar_header {\n  display: flex;\n  align-items: center; }\n  .calendar_header li {\n    margin-right: 8px; }\n\n.calendar_container .calendar {\n  width: 100%;\n  padding: 16px 0 0 0;\n  display: flex;\n  flex-flow: row wrap; }\n  .calendar_container .calendar .calendar_row {\n    width: 100%;\n    display: flex; }\n    .calendar_container .calendar .calendar_row .event,\n    .calendar_container .calendar .calendar_row .block {\n      margin: 0 0 16px 8px !important;\n      font-family: unset; }\n      .calendar_container .calendar .calendar_row .event__badge,\n      .calendar_container .calendar .calendar_row .block__badge {\n        display: block; }\n      .calendar_container .calendar .calendar_row .event__inner,\n      .calendar_container .calendar .calendar_row .block__inner {\n        background: #EEE;\n        color: rgba(0, 0, 0, 0.87);\n        font-family: unset; }\n        .calendar_container .calendar .calendar_row .event__inner.--red,\n        .calendar_container .calendar .calendar_row .block__inner.--red {\n          background: #c62828;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--pink,\n        .calendar_container .calendar .calendar_row .block__inner.--pink {\n          background: #ad1457;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--purple,\n        .calendar_container .calendar .calendar_row .block__inner.--purple {\n          background: #6a1b9a;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--deep-purple,\n        .calendar_container .calendar .calendar_row .block__inner.--deep-purple {\n          background: #4527a0;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--indigo,\n        .calendar_container .calendar .calendar_row .block__inner.--indigo {\n          background: #283593;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--blue,\n        .calendar_container .calendar .calendar_row .block__inner.--blue {\n          background: #1565c0;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--light-blue,\n        .calendar_container .calendar .calendar_row .block__inner.--light-blue {\n          background: #0277bd;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--cyan,\n        .calendar_container .calendar .calendar_row .block__inner.--cyan {\n          background: #00838f;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--teal,\n        .calendar_container .calendar .calendar_row .block__inner.--teal {\n          background: #00695c;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--green,\n        .calendar_container .calendar .calendar_row .block__inner.--green {\n          background: #2e7d32;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--light-green,\n        .calendar_container .calendar .calendar_row .block__inner.--light-green {\n          background: #558b2f;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--lime,\n        .calendar_container .calendar .calendar_row .block__inner.--lime {\n          background: #9e9d24;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--yellow,\n        .calendar_container .calendar .calendar_row .block__inner.--yellow {\n          background: #f9a825;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--amber,\n        .calendar_container .calendar .calendar_row .block__inner.--amber {\n          background: #ff8f00;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--orange,\n        .calendar_container .calendar .calendar_row .block__inner.--orange {\n          background: #ef6c00;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--deep-orange,\n        .calendar_container .calendar .calendar_row .block__inner.--deep-orange {\n          background: #d84315;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--brown,\n        .calendar_container .calendar .calendar_row .block__inner.--brown {\n          background: #4e342e;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--blue-grey,\n        .calendar_container .calendar .calendar_row .block__inner.--blue-grey {\n          background: #37474f;\n          color: white; }\n        .calendar_container .calendar .calendar_row .event__inner.--black,\n        .calendar_container .calendar .calendar_row .block__inner.--black {\n          background: black;\n          color: white; }\n      .calendar_container .calendar .calendar_row .event__content,\n      .calendar_container .calendar .calendar_row .block__content {\n        font-size: 12px;\n        padding: 16px 12px;\n        min-height: 96px; }\n      .calendar_container .calendar .calendar_row .event__label,\n      .calendar_container .calendar .calendar_row .block__label {\n        font-size: 10px;\n        font-weight: 500;\n        margin-bottom: 4px;\n        text-transform: uppercase;\n        letter-spacing: 0.025rem; }\n      .calendar_container .calendar .calendar_row .event__title,\n      .calendar_container .calendar .calendar_row .block__title {\n        font-weight: 500;\n        line-height: 14px;\n        margin-bottom: 4px; }\n      .calendar_container .calendar .calendar_row .event__memo,\n      .calendar_container .calendar .calendar_row .block__memo {\n        line-height: 14px;\n        font-weight: 400;\n        margin: 0; }\n    .calendar_container .calendar .calendar_row .label {\n      width: 100%;\n      color: inherit;\n      padding: 8px 16px;\n      text-align: center; }\n      .calendar_container .calendar .calendar_row .label .day {\n        text-transform: uppercase;\n        margin: 0 0 4px 0;\n        font-weight: 500; }\n      .calendar_container .calendar .calendar_row .label .date {\n        display: inline-block;\n        margin: 0;\n        width: 32px;\n        height: 32px;\n        line-height: 32px;\n        padding: 8px;\n        border-radius: 50%;\n        background: none;\n        font-weight: 400;\n        font-weight: 400; }\n      .calendar_container .calendar .calendar_row .label.--today {\n        color: #034670; }\n        .calendar_container .calendar .calendar_row .label.--today .date {\n          background: #034670;\n          color: rgba(255, 255, 255, 0.87); }\n    .calendar_container .calendar .calendar_row .calendar_events {\n      width: 100%;\n      padding: 8px 0 0 0;\n      border-right: 1px solid #EEE;\n      border-bottom: 1px solid #EEE;\n      display: flex;\n      flex-flow: column-reverse; }\n      .calendar_container .calendar .calendar_row .calendar_events:last-child {\n        border-right: none; }\n    .calendar_container .calendar .calendar_row .calendar_blocks {\n      width: 100%;\n      padding: 8px 16px 16px 0;\n      border-right: 1px solid #EEE; }\n      .calendar_container .calendar .calendar_row .calendar_blocks:last-child {\n        border-right: none; }\n      .calendar_container .calendar .calendar_row .calendar_blocks .block__inner.--missed {\n        background: #f44336;\n        color: rgba(255, 255, 255, 0.87); }\n      .calendar_container .calendar .calendar_row .calendar_blocks .block__inner.--attended {\n        background: #4caf50;\n        color: rgba(255, 255, 255, 0.87); }\n      .calendar_container .calendar .calendar_row .calendar_blocks .block__inner.--appointed {\n        background: #ff9800;\n        color: rgba(255, 255, 255, 0.87); }\n      .calendar_container .calendar .calendar_row .calendar_blocks .block__inner.--now {\n        border: 3px solid rgba(3, 70, 112, 0.54);\n        border-radius: 4px; }\n      .calendar_container .calendar .calendar_row .calendar_blocks .block__inner.--void {\n        background: #CCC;\n        color: rgba(75, 75, 75, 0.87); }\n        .calendar_container .calendar .calendar_row .calendar_blocks .block__inner.--void .block__label {\n          text-decoration: line-through; }\n\n.calendar-block-dialog__title {\n  width: 600px; }\n  .calendar-block-dialog__title .dialog-title__content {\n    height: 86px;\n    width: unset; }\n  .calendar-block-dialog__title .dialog-title__inner {\n    line-height: 16px; }\n    .calendar-block-dialog__title .dialog-title__inner .label {\n      text-transform: uppercase;\n      letter-spacing: 0.025px; }\n      .calendar-block-dialog__title .dialog-title__inner .label span {\n        text-transform: unset;\n        font-weight: 400;\n        padding-left: 8px;\n        margin-left: 8px;\n        border-left: 2px solid #888; }\n    .calendar-block-dialog__title .dialog-title__inner .date {\n      font-weight: 400; }\n\n.calendar-block-dialog .section-header {\n  color: rgba(0, 0, 0, 0.87);\n  text-transform: uppercase;\n  margin: 0 0 12px 0; }\n\n.calendar-block-dialog .section {\n  padding-left: 16px;\n  margin-bottom: 16px; }\n\n.calendar-block-dialog .empty_text {\n  font-style: italic; }\n\n.calendar_item {\n  display: flex;\n  flex-flow: row;\n  line-height: 24px;\n  justify-content: space-between;\n  padding: 8px 16px;\n  position: relative;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  border-radius: 4px; }\n  .calendar_item__container + .calendar_item__container,\n  .calendar_item__container + * .calendar_item__container {\n    margin-top: 8px; }\n  .calendar_item__title {\n    display: flex;\n    font-size: unset;\n    font-weight: 500;\n    margin: 0; }\n    .calendar_item__title > span {\n      display: flex;\n      align-items: center;\n      margin-left: 8px;\n      padding-left: 8px;\n      border-left: 1px solid #888;\n      color: #888;\n      font-weight: 400; }\n      .calendar_item__title > span .icon {\n        margin-left: 8px;\n        cursor: pointer; }\n  .calendar_item__memo {\n    display: flex;\n    flex-flow: row wrap;\n    align-items: center; }\n    .calendar_item__memo p {\n      margin: 0; }\n    .calendar_item__memo > * + p {\n      margin-left: 8px; }\n  .calendar_item__actions {\n    margin-left: 16px;\n    display: flex;\n    flex-flow: row;\n    align-items: center; }\n  .calendar_item::after {\n    background: #EEE;\n    content: '';\n    width: 8px;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border-radius: 4px 0 0 4px; }\n  .calendar_item.--selectable {\n    cursor: pointer;\n    user-select: none; }\n  .calendar_item.--disabled {\n    color: #444;\n    background: #EEE;\n    cursor: default; }\n  .calendar_item.--success::after {\n    background: #4caf50; }\n  .calendar_item.--fail::after {\n    background: #f44336; }\n  .calendar_item.--red::after {\n    background: #c62828; }\n  .calendar_item.--pink::after {\n    background: #ad1457; }\n  .calendar_item.--purple::after {\n    background: #6a1b9a; }\n  .calendar_item.--deep-purple::after {\n    background: #4527a0; }\n  .calendar_item.--indigo::after {\n    background: #283593; }\n  .calendar_item.--blue::after {\n    background: #1565c0; }\n  .calendar_item.--light-blue::after {\n    background: #0277bd; }\n  .calendar_item.--cyan::after {\n    background: #00838f; }\n  .calendar_item.--teal::after {\n    background: #00695c; }\n  .calendar_item.--green::after {\n    background: #2e7d32; }\n  .calendar_item.--light-green::after {\n    background: #558b2f; }\n  .calendar_item.--lime::after {\n    background: #9e9d24; }\n  .calendar_item.--yellow::after {\n    background: #f9a825; }\n  .calendar_item.--amber::after {\n    background: #ff8f00; }\n  .calendar_item.--orange::after {\n    background: #ef6c00; }\n  .calendar_item.--deep-orange::after {\n    background: #d84315; }\n  .calendar_item.--brown::after {\n    background: #4e342e; }\n  .calendar_item.--blue-grey::after {\n    background: #37474f; }\n  .calendar_item.--black::after {\n    background: black; }\n\n.calendar_widget__actions > * + * {\n  margin-left: 8px !important; }\n\n.check_in_actions {\n  display: flex;\n  align-items: center;\n  flex-flow: row nowrap;\n  justify-content: flex-end; }\n  .check_in_actions > * + * {\n    margin-left: 8px; }\n\n.chip_select {\n  margin-bottom: 8px; }\n  .chip_select__textfield {\n    display: flex;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    align-items: center;\n    height: 48px;\n    padding: 4px; }\n    .chip_select__textfield > * {\n      margin: 4px; }\n  .chip_select__actions {\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n    flex: 1;\n    margin: 0;\n    padding-left: 8px;\n    min-width: 320px; }\n    .chip_select__actions > * + * {\n      margin-left: 4px !important; }\n  .chip_select__input {\n    min-width: 64px;\n    margin-right: 32px;\n    width: 100%; }\n  .chip_select__divider {\n    height: 24px !important; }\n  .chip_select__loading {\n    padding: 8px; }\n  .chip_select__popper {\n    z-index: 2; }\n    .chip_select__popper ul {\n      max-height: 240px;\n      overflow-x: auto; }\n    .chip_select__popper .no_results {\n      padding: 4px 16px; }\n    .chip_select__popper .chip_avatar {\n      width: 24px;\n      height: 24px;\n      font-size: 12px;\n      margin-right: 8px; }\n  .chip_select .chips_container {\n    margin-top: 16px;\n    margin-bottom: 0; }\n\n.content {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  position: relative;\n  z-index: 1;\n  padding: 0 64px;\n  flex: 1;\n  height: 100vh;\n  overflow: auto;\n  box-sizing: border-box;\n  transition: margin 0.2s; }\n  .content.--content-inner {\n    padding: 32px 64px;\n    background: #EFEFEF; }\n\n.date_widget {\n  padding: 8px 16px;\n  height: 248px;\n  box-sizing: content-box;\n  display: flex;\n  flex-flow: row nowrap; }\n  .date_widget > * {\n    flex: 1; }\n  .date_widget > div {\n    display: flex;\n    flex-flow: column nowrap;\n    justify-content: space-between; }\n  .date_widget .divider {\n    flex: unset;\n    margin-left: 16px; }\n  .date_widget__absolute_range {\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center; }\n    .date_widget__absolute_range > * + * {\n      margin-left: 8px; }\n  .date_widget__predefined_ranges {\n    padding: 0;\n    height: 224px;\n    line-height: 24px;\n    display: flex;\n    flex-flow: column wrap; }\n    .date_widget__predefined_ranges li {\n      display: block; }\n    .date_widget__predefined_ranges .predefined_range {\n      font-weight: 500;\n      color: #034670; }\n      .date_widget__predefined_ranges .predefined_range:hover {\n        cursor: pointer; }\n  .date_widget > * + * {\n    margin-left: 16px; }\n\n.empty-state-icon {\n  width: 100%;\n  margin: 40px 0 0;\n  text-align: center; }\n  .empty-state-icon__image {\n    display: block;\n    background-size: contain;\n    background-repeat: no-repeat;\n    width: 120px;\n    height: 120px;\n    margin: 0 auto 16px; }\n  .empty-state-icon h3 {\n    font-weight: 500; }\n\n.expansion-panel__summary {\n  display: flex;\n  align-items: center; }\n\n.expansion-panel__heading {\n  flex-basis: 30%; }\n\n.expansion-panel__subheading {\n  color: #777; }\n\n.expansion-panel__details {\n  display: block !important;\n  max-height: 250px;\n  overflow: auto; }\n\n.expansion-panel__chips {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center;\n  justify-content: flex-start; }\n  .expansion-panel__chips > * {\n    margin: 4px; }\n\n.items_modal__content .content-inner {\n  margin-left: 32px; }\n\n.items_modal__content-loader {\n  width: 500px;\n  height: 426px;\n  position: absolute;\n  top: 86px;\n  left: 0;\n  pointer-events: none; }\n\n.items_modal .items-group_header {\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  color: #777; }\n\n.items_modal .items-group_list {\n  margin-bottom: 8px; }\n  .items_modal .items-group_list__item {\n    border-radius: 2px; }\n    .items_modal .items-group_list__item:hover {\n      background: #EEE; }\n\n.modal-section__button .button_text {\n  margin-left: 8px;\n  font-size: 16px;\n  font-weight: 500;\n  font-size: inherit; }\n  .modal-section__button .button_text + * {\n    margin-left: 8px; }\n\n.modal-section__header {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  margin-bottom: 8px; }\n  .modal-section__header > * + * {\n    margin-left: 8px; }\n\n.modal-section__content {\n  margin: 0 0 16px 40px; }\n\n.not-found .empty-state-icon {\n  margin-top: 50vh;\n  transform: translate(0, -100%); }\n\n.notifications_modal__content .content-inner {\n  margin-left: 32px; }\n\n.notifications_modal__actions {\n  text-align: right;\n  margin-bottom: 8px; }\n  .notifications_modal__actions > * {\n    margin-right: 8px; }\n    .notifications_modal__actions > *:last-child {\n      margin-right: 0; }\n\n.notifications_modal__textfield {\n  margin: 16px 0; }\n\n.notifications_modal .sidebar_modal__header {\n  justify-content: space-between; }\n  .notifications_modal .sidebar_modal__header > div:first-child {\n    display: flex;\n    align-items: center; }\n\n.notifications_modal .notification .icon {\n  margin-right: 8px; }\n\n.notifications_modal .notification__info {\n  width: 100%;\n  display: grid;\n  font-weight: 700; }\n  .notifications_modal .notification__info .header {\n    margin: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n    .notifications_modal .notification__info .header .unread-badge {\n      background: #034670;\n      display: inline-block;\n      width: 6px;\n      border-radius: 50%;\n      height: 6px;\n      margin: 2px 8px 2px 0; }\n  .notifications_modal .notification__info .time {\n    font-weight: 400; }\n\n.notifications_modal .notification.--read .notification__info {\n  font-weight: 500; }\n\n.power-scheduler__date {\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  margin: 8px 0; }\n  .power-scheduler__date > * + * {\n    margin-left: 16px !important; }\n\n.profile .profile_title {\n  display: flex;\n  align-items: center;\n  line-height: 22px; }\n  .profile .profile_title .profile_avatar {\n    margin-right: 12px; }\n  .profile .profile_title .name {\n    margin: 0;\n    font-weight: 500; }\n    .profile .profile_title .name .grade {\n      font-weight: 400;\n      color: #888;\n      margin-left: 8px;\n      border-left: 1px solid #888;\n      padding-left: 8px; }\n  .profile .profile_title .cluster-list {\n    font-weight: 700;\n    margin: 0;\n    color: #888; }\n\n.reporting {\n  position: relative; }\n  .reporting__group {\n    display: flex;\n    flex-flow: row wrap;\n    margin: 16px 0; }\n  .reporting__variant {\n    max-width: 320px; }\n  .reporting .report__header {\n    display: flex;\n    align-items: flex-end;\n    flex-flow: row wrap; }\n    .reporting .report__header .header_info {\n      margin-bottom: 20px; }\n    .reporting .report__header .header_actions {\n      display: flex;\n      flex-flow: row wrap;\n      align-items: initial; }\n      .reporting .report__header .header_actions > * + * {\n        margin-left: 16px; }\n    .reporting .report__header > * + * {\n      margin-left: 32px; }\n\n.report_access {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start !important; }\n  .report_access > div {\n    flex-grow: 0; }\n    .report_access > div + div {\n      flex-grow: 1;\n      padding: 8px 0 0 8px; }\n    .report_access > div h6 {\n      display: flex;\n      align-items: center;\n      font-weight: 500; }\n      .report_access > div h6 > span + span {\n        margin-left: 8px; }\n\n.search_modal__content .content-inner {\n  margin-left: 32px; }\n\n.search_modal .search-group_header {\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  color: #777; }\n\n.search_modal .search-group_list {\n  margin-bottom: 8px; }\n  .search_modal .search-group_list__item {\n    border-radius: 2px; }\n    .search_modal .search-group_list__item:hover {\n      background: #EEE; }\n\n.selectable-list__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 4px;\n  margin-bottom: 8px;\n  height: 48px; }\n  .selectable-list__header .selectable-list__title,\n  .selectable-list__header .selectable-list__actions {\n    display: flex;\n    align-items: center; }\n    .selectable-list__header .selectable-list__title > * + *,\n    .selectable-list__header .selectable-list__actions > * + * {\n      margin-left: 8px; }\n\n.selectable-list__list {\n  padding: 0 !important; }\n\n.setting {\n  display: flex; }\n\n.sidebar {\n  height: 100vh;\n  position: relative;\n  display: flex;\n  flex-shrink: 1;\n  width: 80px;\n  background: #e3e9ee;\n  transition-property: width;\n  transition-duration: 0.3s;\n  transition-timing-function: cubic-bezier(0.2, 0, 0, 1); }\n  .sidebar__nav {\n    width: 64px;\n    height: 100vh;\n    position: relative;\n    z-index: 3;\n    box-shadow: inset -6px 0 6px -6px rgba(0, 0, 0, 0.16), inset -6px 0 6px -6px rgba(0, 0, 0, 0.23);\n    margin-right: 16px;\n    padding: 16px 8px;\n    box-sizing: border-box;\n    background: #034670;\n    color: #e3e9ee;\n    display: flex;\n    flex-flow: column;\n    justify-content: space-between; }\n    .sidebar__nav .nav_account {\n      padding: 8px; }\n    .sidebar__nav > div > * {\n      color: inherit; }\n    .sidebar__nav .nav_button {\n      color: inherit; }\n      .sidebar__nav .nav_button .nav_avatar {\n        width: 32px;\n        height: 32px;\n        font-size: 14px; }\n  .sidebar__menu {\n    position: absolute;\n    left: 64px;\n    top: 0;\n    z-index: 2;\n    height: 100vh;\n    width: 0;\n    flex-shrink: 0;\n    background: #e3e9ee;\n    padding: 0;\n    margin: 0;\n    box-sizing: content-box;\n    display: inline-block;\n    box-shadow: none;\n    overflow-y: auto;\n    overflow-x: hidden;\n    transition-duration: 0.3s;\n    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);\n    transition-property: width, box-shadow; }\n    .sidebar__menu .menu_content {\n      position: relative;\n      width: 260px; }\n    .sidebar__menu .menu_header {\n      height: 80px;\n      margin: 0 16px 8px;\n      padding: 16px;\n      box-sizing: border-box;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n      display: flex;\n      flex-flow: row nowrap;\n      align-items: center; }\n      .sidebar__menu .menu_header__logo {\n        width: 48px;\n        max-height: 48px;\n        margin-right: 8px;\n        background: rgba(3, 70, 112, 0.54);\n        background-repeat: no-repeat;\n        background-size: cover;\n        border-radius: 2px;\n        overflow: hidden; }\n        .sidebar__menu .menu_header__logo.--logo {\n          background: unset; }\n        .sidebar__menu .menu_header__logo img {\n          width: 100%; }\n      .sidebar__menu .menu_header h4 {\n        margin: 0;\n        font-weight: 500;\n        letter-spacing: normal;\n        text-transform: uppercase;\n        font-size: 14px; }\n    .sidebar__menu .menu_list {\n      padding: 0 16px; }\n      .sidebar__menu .menu_list__link {\n        color: inherit; }\n        .sidebar__menu .menu_list__link .list_item {\n          display: flex;\n          align-items: center;\n          padding: 8px 16px;\n          margin: 4px 0;\n          min-width: 128px;\n          max-width: 224px;\n          height: 48px;\n          box-sizing: border-box;\n          line-height: 18px !important;\n          border-radius: 2px;\n          font-weight: 500;\n          cursor: pointer;\n          user-select: none;\n          transition: color 0.2s; }\n          .sidebar__menu .menu_list__link .list_item:hover {\n            background: rgba(3, 70, 112, 0.12); }\n          .sidebar__menu .menu_list__link .list_item__icon {\n            color: rgba(0, 0, 0, 0.54); }\n        .sidebar__menu .menu_list__link.--selected .list_item {\n          color: #034670;\n          background: rgba(3, 70, 112, 0.12); }\n          .sidebar__menu .menu_list__link.--selected .list_item__icon {\n            color: #034670; }\n\n.nav_account_details {\n  padding: 8px 16px; }\n  .nav_account_details h3 {\n    margin: 0;\n    line-height: 24px;\n    display: flex;\n    font-weight: 500; }\n  .nav_account_details h5 {\n    margin: 0;\n    font-weight: 500;\n    color: #888; }\n\n.sidebar_modal {\n  width: 500px; }\n  .sidebar_modal__header {\n    display: flex;\n    align-items: center;\n    padding: 16px 32px 8px 8px; }\n    .sidebar_modal__header .button_back {\n      margin-right: 8px; }\n    .sidebar_modal__header h3 {\n      margin: 0; }\n  .sidebar_modal__content {\n    padding: 8px 32px 16px 32px; }\n\n.splash {\n  position: relative; }\n  .splash__inner {\n    position: fixed;\n    background: #F1F1F1;\n    z-index: 110;\n    width: 100vw;\n    height: 100vh; }\n  .splash__content {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    text-align: center; }\n    .splash__content > * {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      z-index: 2; }\n  .splash__image_logo {\n    display: block;\n    width: 64px;\n    height: 64px;\n    margin: 16px; }\n  .splash .loading_badge {\n    width: 150px;\n    height: 150px;\n    z-index: 1 !important; }\n    .splash .loading_badge .left {\n      opacity: 0.5; }\n    .splash .loading_badge .right {\n      opacity: 1; }\n    .splash .loading_badge svg {\n      width: 100%;\n      height: 100%; }\n\n.starred_modal__content .content-inner {\n  margin-left: 32px; }\n  .starred_modal__content .content-inner .items-group_list__item + .star {\n    opacity: 0;\n    visibility: hidden; }\n    .starred_modal__content .content-inner .items-group_list__item + .star:hover {\n      opacity: 1;\n      visibility: visible; }\n  .starred_modal__content .content-inner .items-group_list__item:hover + .star {\n    opacity: 1;\n    visibility: visible; }\n\n.--starred {\n  color: #ffd600 !important; }\n\n.enhanced-table {\n  margin: 16px 0; }\n  .enhanced-table .empty-state {\n    padding: 64px;\n    border-radius: 4px;\n    border: 2px dotted #222; }\n  .enhanced-table__link {\n    cursor: pointer; }\n  .enhanced-table__toolbar {\n    width: 100%;\n    display: flex;\n    flex-flow: row;\n    align-items: center;\n    justify-content: space-between; }\n    .enhanced-table__toolbar h3 {\n      margin: 0; }\n      .enhanced-table__toolbar h3.num-selected {\n        font-weight: 400; }\n    .enhanced-table__toolbar .enhanced-table__tools {\n      display: flex;\n      flex-flow: row;\n      align-items: center; }\n  .enhanced-table .enhanced-table__filters {\n    width: 450px;\n    position: absolute;\n    top: 8px;\n    right: 8px;\n    padding: 16px;\n    background: #FFF;\n    border-radius: 2px;\n    z-index: 100; }\n    .enhanced-table .enhanced-table__filters .placeholder {\n      margin: 16px;\n      text-align: center; }\n    .enhanced-table .enhanced-table__filters .filters-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      box-sizing: border-box; }\n      .enhanced-table .enhanced-table__filters .filters-header h3 {\n        margin: 0; }\n      .enhanced-table .enhanced-table__filters .filters-header .filter-actions {\n        display: flex;\n        flex-flow: row; }\n        .enhanced-table .enhanced-table__filters .filters-header .filter-actions .filter-action {\n          margin-left: 8px; }\n          .enhanced-table .enhanced-table__filters .filters-header .filter-actions .filter-action:last-child {\n            margin-left: 0; }\n    .enhanced-table .enhanced-table__filters .filters-actions {\n      display: flex;\n      flex-flow: row nowrap;\n      align-items: flex-end; }\n      .enhanced-table .enhanced-table__filters .filters-actions > * + * {\n        margin-left: 8px; }\n    .enhanced-table .enhanced-table__filters .filter-rule {\n      display: flex;\n      align-items: baseline;\n      margin-bottom: 8px; }\n      .enhanced-table .enhanced-table__filters .filter-rule > * {\n        margin-left: 8px; }\n        .enhanced-table .enhanced-table__filters .filter-rule > *:first-child {\n          margin-left: 0; }\n        .enhanced-table .enhanced-table__filters .filter-rule > *.--enum {\n          flex-grow: 1; }\n      .enhanced-table .enhanced-table__filters .filter-rule:last-child {\n        margin-bottom: 16px; }\n    .enhanced-table .enhanced-table__filters .filter-rule_placeholder {\n      display: flex;\n      flex-flow: row nowrap;\n      justify-content: flex-end; }\n\n.topics_dialog__new .topic_name {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  margin: 16px 0 8px; }\n  .topics_dialog__new .topic_name .color_swatch {\n    margin-right: 8px;\n    border-radius: 50%; }\n    .topics_dialog__new .topic_name .color_swatch * {\n      color: rgba(255, 255, 255, 0.87); }\n\n.colors_dialog__colors {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 4px; }\n\n.colors_dialog .color {\n  display: flex;\n  align-items: center;\n  padding: 4px;\n  cursor: pointer; }\n  .colors_dialog .color.--selected {\n    outline: 2px solid #034670; }\n  .colors_dialog .color__name {\n    font-weight: 400;\n    margin: 0; }\n  .colors_dialog .color__swatch {\n    width: 24px;\n    height: 24px;\n    border-radius: 50%;\n    margin-right: 8px; }\n\n.top-nav {\n  padding: 16px;\n  border-bottom: 1px solid #EEE;\n  margin-bottom: 16px; }\n  .top-nav.--tabs {\n    display: grid;\n    padding: 0; }\n    .top-nav.--tabs .top-nav__inner {\n      padding: 16px 16px 8px 16px; }\n  .top-nav__inner {\n    height: 48px;\n    line-height: 48px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .top-nav__inner ul {\n      display: flex; }\n      .top-nav__inner ul li {\n        margin-left: 16px; }\n        .top-nav__inner ul li:first-child {\n          margin-left: 0; }\n    .top-nav__inner h3 {\n      margin: 0; }\n  .top-nav__actions {\n    display: flex;\n    align-items: center;\n    flex-flow: row nowrap; }\n    .top-nav__actions > div + div {\n      margin-left: 8px; }\n\n/* D3.js */\n", "",{"version":3,"sources":["C:/Projects/spotlight/resources/src/assets/styles/main.scss","C:/Projects/spotlight/resources/src/assets/styles/common/_global.scss","C:/Projects/spotlight/resources/src/assets/styles/common/_colors.scss","C:/Projects/spotlight/resources/src/assets/styles/common/_variables.scss","C:/Projects/spotlight/resources/src/assets/styles/layouts/_app.scss","C:/Projects/spotlight/resources/src/assets/styles/layouts/_drawer.scss","C:/Projects/spotlight/resources/src/assets/styles/layouts/_form.scss","C:/Projects/spotlight/resources/src/assets/styles/layouts/_login.scss","C:/Projects/spotlight/resources/src/assets/styles/layouts/_router.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_about.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_banner.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_calendar.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_check-in.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_chip_select.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_content.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_date_widget.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_empty_state.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_expansion_panel.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_items_modal.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_modal_section.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_not_found.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_notifications_modal.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_power_scheduler.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_profile.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_report.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_search_modal.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_selectable_list.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_settings.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_sidebar.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_sidebar_modal.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_splash.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_starred.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_table.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_topics.scss","C:/Projects/spotlight/resources/src/assets/styles/components/_topnav.scss"],"names":[],"mappings":"AAAA,SAAA;ACAA;EACC,SAAS;EACT,UAAU;EACV,6CACD,EAAA;;AAEA;EACC,gBAAgB;EAChB,SAAS;EACT,UAAU,EAAA;;AAGX;EACC,qBAAqB;EACrB,cAAc,EAAA;EAFf;IAOE,aAAa,EAAA;;AAIf;EACC,iBAAiB,EAAA;;ACxBlB;;;;;;;EAQQ,mBCYY,EAAA;;ADpBpB;;;;;;;EAYQ,mBCSa,EAAA;;ADrBrB;;;;;;;EAgBQ,mBCMgB,EAAA;;ADtBxB;;;;;;;EAoBQ,mBCGoB,EAAA;;ADvB5B;;;;;;;EAwBQ,mBCAe,EAAA;;ADxBvB;;;;;;;EA4BQ,mBCHc,EAAA;;ADzBtB;;;;;;;EAgCQ,mBCNmB,EAAA;;AD1B3B;;;;;;;EAoCQ,mBCTa,EAAA;;AD3BrB;;;;;;;EAwCQ,mBCZY,EAAA;;AD5BpB;;;;;;;EA4CQ,mBCfc,EAAA;;AD7BtB;;;;;;;EAgDQ,mBClBoB,EAAA;;AD9B5B;;;;;;;EAoDQ,mBCrBc,EAAA;;AD/BtB;;;;;;;EAwDQ,mBCxBgB,EAAA;;ADhCxB;;;;;;;EA4DQ,mBC3Bc,EAAA;;ADjCtB;;;;;;;EAgEQ,mBC9Be,EAAA;;ADlCvB;;;;;;;EAoEQ,mBCjCoB,EAAA;;ADnC5B;;;;;;;EAwEQ,mBCpCa,EAAA;;ADpCrB;;;;;;;EA4EQ,mBCvCiB,EAAA;;ADrCzB;;;;;;;EAgFQ,iBC1CU,EAAA;;AD8ClB;EACI,2CAA6B,EAAA;;AFhFjC,WAAA;AILA;EACC,aAAa,EAAA;EADd;IAKG,YAAY;IACZ,cAAc;IACd,wEDKgE,EAAA;ECZnE;IAYE,YAAY,EAAA;IAZd;MAeG,YAAY;MACZ,kBAAkB;MAClB,2BAA2B,EAAA;;AAK9B;EACC,aAAa;EACb,qBAAqB;EACrB,mBAAmB,EAAA;EAHpB;IAME,2BAA2B,EAAA;;AAI7B;EACC,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,sBAAsB;EACtB,qBAAqB;EACrB,aAAa;EACb,gBAAgB;EACb,kBAAkB,EAAA;EARtB;IAWE,WAAW;IACX,wDAAwD;IACxD,2BAA2B;IAC3B,sBAAsB;IACtB,WAAW;IACX,YAAY;IACZ,cAAc,EAAA;;ACjDhB;EACI,gBAAgB;EAChB,eAAe;EACf,YAAY;EACZ,MAAM;EACN,aAAa;EACb,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,sBAAsB;EACtB,wEFE+D;EED/D,yBAAyB;EACzB,0BAA0B,EAAA;EAZ9B;IAeQ,mBAAmB,EAAA;EAf3B;IAoBQ,QAAQ,EAAA;EAGZ;IACI,YAAY;IACZ,kBAAkB;IAClB,uBAAuB;IACvB,6BAA6B;IAC7B,mBAAmB,EAAA;IALtB;MAQO,4BAA4B,EAAA;EAIpC;IACI,kBAAkB;IAClB,qBAAqB;IACrB,QAAQ;IACR,SAAS;IACT,gCAAgC,EAAA;;AAIxC;EACI,cAAc;EACd,kBAAkB,EAAA;EAElB;IACI,aAAa;IACb,cAAc;IACd,YAAY;IACZ,eAAe,EAAA;EAGnB;IACI,kBAAkB;IAClB,SAAS;IACT,gBAAgB;IAChB,gBAAgB,EAAA;EAGpB;IACI,kBAAkB;IAClB,OAAO;IACP,SAAS;IACT,yBAA0B,EAAA;EAtBlC;IA0BQ,UAAU,EAAA;EA1BlB;;IAgCQ,uBAAuB,EAAA;;AC3E9B;EACC,YAAY;EACZ,YAAY;EACZ,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;;AAThC;EAaE,iBAAiB,EAAA;;AAbnB;EAiBE,SAAS,EAAA;;AAjBX;EAsBG,4BAA4B,EAAA;;AAM9B;EACC,aAAa,EAAA;EADb;IAIC,2BAA2B,EAAA;;AAK9B;EAEE,YAAY,EAAA;;AAId;EAEE,2BAA2B,EAAA;;AAI7B;EACC,kBAAkB;EAClB,qBAAqB,EAAA;EAFtB;IAKE,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,iBAAiB;IACjB,kBAAkB,EAAA;;AAIpB;EACC,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,wBAAwB,EAAA;EAJzB;IAOE,kBAAkB,EAAA;EAPpB;IAWE,kBAAkB;IAClB,QAAQ;IACR,UAAU;IACV,iBAAiB;IACjB,kBAAkB,EAAA;;AAIpB;EACC,aAAa;EACb,2BAA2B;EAC3B,eAAe;EACf,kBAAkB,EAAA;EAJnB;IAOE,WAAW,EAAA;;AAIb;EACC,gBAAgB;EAChB,gBAAgB,EAAA;;AAGjB;EACC,eAAe,EAAA;;AAGhB;EACC,gBAAgB;EAChB,WAAW;EACX,sBAAsB,EAAA;;AAGvB;EACC,kBAAkB;EACf,mBAAmB;EACnB,kBAAkB,EAAA;;AAGtB;EACC,aAAa;EACb,mBAAmB;EACnB,mBAAmB,EAAA;EAHpB;IAME,aAAa,EAAA;EANf;IAUE,yBAAsB,EAAA;;AC3HxB;EACC,WAAW;EACX,aAAa;EACb,gCAAgC;EAChC,aAAa;EACb,8BAA8B,EAAA;EAE9B;IACC,WAAW;IACX,kBAAkB;IAClB,gBAAgB,EAAA;IAHhB;MAMC,kBAAkB;MAClB,YAAY;MACZ,QAAQ;MACR,SAAS;MACT,gCAAgC,EAAA;MAVjC;QAaE,aAAa;QACb,WAAW,EAAA;EAKd;IACC,mBJ3BuB;II4BvB,aAAa;IACb,kBAAkB;IAClB,gBAAgB,EAAA;IAJhB;MAOC,YAAY;MACZ,WAAW,EAAA;IARZ;MAYC,YAAY;MACZ,mBAAmB;MACnB,aAAa;MACb,mBAAmB;MACnB,uBAAuB,EAAA;MAhBxB;QAmBE,eAAe;QACf,iBAAiB;QACjB,qBAAqB;QACrB,aAAa;QACb,gBAAgB;QAChB,WAAW,EAAA;IAxBb;MA6BC,YAAY;MACZ,kBAAkB;MAClB,QAAQ;MACR,SAAS;MACT,gCAAgC,EAAA;MAjCjC;QAoCE,kBAAkB,EAAA;MApCpB;QAwCE,aAAa;QACb,cAAc;QACd,mBAAmB;QACnB,uBAAuB;QACvB,iBAAiB,EAAA;QA5CnB;UA+CG,iBAAiB;UACjB,YAAY,EAAA;QAhDf;UAoDG,gBAAgB;UAChB,SAAS,EAAA;MArDZ;QA0DE,kBAAkB;QAClB,gCAA6B;QAC7B,gBAAgB,EAAA;QA5DlB;UA+DG,0BAA0B,EAAA;MA/D7B;QAoEE,aAAa;QACb,mBAAmB,EAAA;QArErB;UAwEG,gBAAgB;UAChB,kBAAkB,EAAA;IAzErB;MA+EC,gBAAgB;MAChB,SAAS;MACT,UAAU;MACV,aAAa;MACb,yBAAyB,EAAA;MAnF1B;QAsFE,kBAAkB;QAClB,gBAAgB,EAAA;EAjHpB;IAuHE,cAAc;IACd,cAAc;IACd,2BAA2B;IAC3B,gCAAgC,EAAA;IA1HlC;MA6HG,aAAa;MACb,mBAAmB;MACnB,uBAAuB,EAAA;MA/H1B;QAkII,gBAAgB,EAAA;;AAMpB;EACC,sBAAsB;EACtB,uBAAuB;EACvB,0BAA0B,EAAA;;AAG3B;EACC,aAAa;EACb,mBAAmB,EAAA;EAFpB;IAKE,2BAA2B,EAAA;;ACnJ7B;EACI,kBAAkB;EAClB,OAAO;EACP,QAAQ,EAAA;;AAGZ;;EAEI,UAAU;EACV,UAAU,EAAA;;AAGd;;EAEI,UAAU;EACV,sCAAsC,EAAA;;AAG1C;EACI,UAAU,EAAA;;AAGd;EACI,UAAU;EACV,gCAAgC,EAAA;;AAGpC;;EAEI,6BAA6B;EAC7B,UAAU,EAAA;;AAGd;;EAEI,0BAA0B;EAC1B,0BAA0B;EAC1B,8BAA8B;EAC9B,sDAAsD,EAAA;;AAG1D;EACI,UAAU,EAAA;;AAGd;EACI,8BAA8B;EAC9B,0BAA0B;EAC1B,8BAA8B;EAC9B,sDAAsD,EAAA;;ARpC1D,eAAA;ASbA;EACI,kBAAkB,EAAA;EAElB;IACI,YAAY;IACZ,YAAY;IACZ,mDAAmD;IACnD,4BAA4B;IAC5B,2BAA2B;IAC3B,mBAAmB,EAAA;EAGvB;IACI,wBAAwB,EAAA;EAG5B;IACI,gBAAgB,EAAA;IADnB;MAGO,gBAAgB,EAAA;;ACnB5B;EACI,gBAAgB;EAChB,YAAY,EAAA;EAFhB;IAKQ,eAAe,EAAA;IALvB;MAQY,YAAY,EAAA;EARxB;IAcY,0BAA0B,EAAA;EAdtC;IAkBY,kBAAkB,EAAA;EAI1B;IACI,WAAW;IACX,aAAa;IACb,qBAAqB;IACrB,8BAA8B;IAC9B,sBAAsB;IACtB,0BAA0B,EAAA;EAG9B;IACI,aAAa;IACb,mBAAmB;IACnB,mBAAmB,EAAA;EAGvB;IACI,kBAAkB;IAClB,aAAa;IACb,qBAAqB;IACrB,qBAAqB,EAAA;IAJxB;MAOO,gBAAgB,EAAA;EAIxB;IACI,kBAAkB,EAAA;;ACjD1B;EACC,aAAa;EACb,mBAAmB,EAAA;EAFpB;IAKE,iBAAiB,EAAA;;AAInB;EAEE,WAAW;EACX,mBAAmB;EACnB,aAAa;EACb,mBAAmB,EAAA;EALrB;IAQG,WAAW;IACX,aAAa,EAAA;IAThB;;MAaI,+BAA+B;MAC/B,kBAAkB,EAAA;MAdtB;;QAiBK,cAAc,EAAA;MAjBnB;;QAqBK,gBAAgB;QAChB,0BAAuB;QACvB,kBAAkB,EAAA;QAvBvB;;UA0BM,mBRfc;UQgBd,YRGwB,EAAA;QQ9B9B;;UA+BM,mBRnBe;UQoBf,YRFwB,EAAA;QQ9B9B;;UAoCM,mBRvBkB;UQwBlB,YRPwB,EAAA;QQ9B9B;;UAyCM,mBR3BsB;UQ4BtB,YRZwB,EAAA;QQ9B9B;;UA8CM,mBR/BiB;UQgCjB,YRjBwB,EAAA;QQ9B9B;;UAmDM,mBRnCgB;UQoChB,YRtBwB,EAAA;QQ9B9B;;UAwDM,mBRvCqB;UQwCrB,YR3BwB,EAAA;QQ9B9B;;UA6DM,mBR3Ce;UQ4Cf,YRhCwB,EAAA;QQ9B9B;;UAkEM,mBR/Cc;UQgDd,YRrCwB,EAAA;QQ9B9B;;UAuEM,mBRnDgB;UQoDhB,YR1CwB,EAAA;QQ9B9B;;UA4EM,mBRvDsB;UQwDtB,YR/CwB,EAAA;QQ9B9B;;UAiFM,mBR3DgB;UQ4DhB,YRpDwB,EAAA;QQ9B9B;;UAsFM,mBR/DkB;UQgElB,YRzDwB,EAAA;QQ9B9B;;UA2FM,mBRnEgB;UQoEhB,YR9DwB,EAAA;QQ9B9B;;UAgGM,mBRvEiB;UQwEjB,YRnEwB,EAAA;QQ9B9B;;UAqGM,mBR3EsB;UQ4EtB,YRxEwB,EAAA;QQ9B9B;;UA0GM,mBR/Ee;UQgFf,YR7EwB,EAAA;QQ9B9B;;UA+GM,mBRnFmB;UQoFnB,YRlFwB,EAAA;QQ9B9B;;UAoHM,iBRvFY;UQwFZ,YRvFwB,EAAA;MQ9B9B;;QA0HK,eAAe;QACf,kBAAkB;QAClB,gBAAgB,EAAA;MA5HrB;;QAgIK,eAAe;QACf,gBAAgB;QAChB,kBAAkB;QAClB,yBAAyB;QACzB,wBAAwB,EAAA;MApI7B;;QAwIK,gBAAgB;QAChB,iBAAiB;QACjB,kBAAkB,EAAA;MA1IvB;;QA8IK,iBAAiB;QACjB,gBAAgB;QAChB,SAAS,EAAA;IAhJd;MAqJI,WAAW;MACX,cAAc;MACd,iBAAiB;MACjB,kBAAkB,EAAA;MAxJtB;QA2JK,yBAAyB;QACzB,iBAAiB;QACjB,gBAAgB,EAAA;MA7JrB;QAiKK,qBAAqB;QACrB,SAAS;QACT,WAAW;QACX,YAAY;QACZ,iBAAiB;QACjB,YAAY;QACZ,kBAAkB;QAClB,gBAAgB;QAChB,gBAAgB;QAChB,gBAAgB,EAAA;MA1KrB;QA8KK,cRvLoB,EAAA;QQSzB;UAiLM,mBR1LmB;UQ2LnB,gCAA6B,EAAA;IAlLnC;MAwLI,WAAW;MACX,kBAAkB;MAClB,4BAA4B;MAC5B,6BAA6B;MAC7B,aAAa;MACb,yBAAyB,EAAA;MA7L7B;QAgMK,kBAAkB,EAAA;IAhMvB;MAqMI,WAAW;MACX,wBAAwB;MACxB,4BAA4B,EAAA;MAvMhC;QA0MK,kBAAkB,EAAA;MA1MvB;QA+MM,mBRxMsB;QQyMtB,gCAA6B,EAAA;MAhNnC;QAoNM,mBR9MsB;QQ+MtB,gCAA6B,EAAA;MArNnC;QAyNM,mBRjNsB;QQkNtB,gCAA6B,EAAA;MA1NnC;QA8NM,wCRrOoC;QQsOpC,kBAAkB,EAAA;MA/NxB;QAmOM,gBAAgB;QAChB,6BAA0B,EAAA;QApOhC;UAuOO,6BAA6B,EAAA;;AAUnC;EACC,YAAY,EAAA;EADZ;IAGC,YAAY;IACZ,YAAY,EAAA;EAJb;IAQC,iBAAiB,EAAA;IARlB;MAWE,yBAAyB;MACzB,uBAAuB,EAAA;MAZzB;QAeG,qBAAqB;QACrB,gBAAgB;QAChB,iBAAiB;QACjB,gBAAgB;QAChB,2BAA2B,EAAA;IAnB9B;MAwBE,gBAAgB,EAAA;;AAzBpB;EA+BE,0BAAuB;EACvB,yBAAyB;EACzB,kBAAkB,EAAA;;AAjCpB;EAqCE,kBAAkB;EAClB,mBAAmB,EAAA;;AAtCrB;EA0CE,kBAAkB,EAAA;;AAIpB;EACC,aAAa;EACb,cAAc;EACd,iBAAiB;EACjB,8BAA8B;EAC9B,iBAAiB;EACjB,kBAAkB;EAClB,wERnSkE;EQoSlE,kBAAkB,EAAA;EAEjB;;IAGC,eAAe,EAAA;EAIjB;IACC,aAAa;IACb,gBAAgB;IAChB,gBAAgB;IAChB,SAAS,EAAA;IAJT;MAOC,aAAa;MACb,mBAAmB;MACnB,gBAAgB;MAChB,iBAAiB;MACjB,2BAA2B;MAC3B,WAAW;MACX,gBAAgB,EAAA;MAbjB;QAgBE,gBAAgB;QAChB,eAAe,EAAA;EAKlB;IACC,aAAa;IACb,mBAAmB;IACnB,mBAAmB,EAAA;IAHnB;MAMC,SAAS,EAAA;IANV;MAUC,gBAAgB,EAAA;EAIlB;IACC,iBAAiB;IACjB,aAAa;IACb,cAAc;IACd,mBAAmB,EAAA;EAzDrB;IA6DE,gBAAgB;IAChB,WAAW;IACX,UAAU;IACV,YAAY;IACZ,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,0BAA0B,EAAA;EApE5B;IAwEE,eAAe;IACf,iBAAiB,EAAA;EAzEnB;IA6EE,WAAW;IACX,gBAAgB;IAChB,eAAe,EAAA;EA/EjB;IAmFE,mBR3W0B,EAAA;EQwR5B;IAuFE,mBR9W0B,EAAA;EQuR5B;IA2FE,mBR9WkB,EAAA;EQmRpB;IA+FE,mBRjXmB,EAAA;EQkRrB;IAmGE,mBRpXsB,EAAA;EQiRxB;IAuGE,mBRvX0B,EAAA;EQgR5B;IA2GE,mBR1XqB,EAAA;EQ+QvB;IA+GE,mBR7XoB,EAAA;EQ8QtB;IAmHE,mBRhYyB,EAAA;EQ6Q3B;IAuHE,mBRnYmB,EAAA;EQ4QrB;IA2HE,mBRtYkB,EAAA;EQ2QpB;IA+HE,mBRzYoB,EAAA;EQ0QtB;IAmIE,mBR5Y0B,EAAA;EQyQ5B;IAuIE,mBR/YoB,EAAA;EQwQtB;IA2IE,mBRlZsB,EAAA;EQuQxB;IA+IE,mBRrZoB,EAAA;EQsQtB;IAmJE,mBRxZqB,EAAA;EQqQvB;IAuJE,mBR3Z0B,EAAA;EQoQ5B;IA2JE,mBR9ZmB,EAAA;EQmQrB;IA+JE,mBRjauB,EAAA;EQkQzB;IAmKQ,iBRpaU,EAAA;;AQyahB;EAEC,2BAA2B,EAAA;;ACjd9B;EACI,aAAa;EACb,mBAAmB;EACnB,qBAAqB;EACrB,yBAAyB,EAAA;EAJ7B;IAOQ,gBAAgB,EAAA;;ACNxB;EACC,kBAAkB,EAAA;EAEf;IACI,aAAa;IACb,2BAA2B;IAC3B,eAAe;IACrB,mBAAmB;IACnB,YAAY;IACN,YAAY,EAAA;IANf;MASO,WAAW,EAAA;EAItB;IACC,aAAa;IACb,qBAAqB;IACrB,mBAAmB;IACnB,OAAO;IACP,SAAS;IACT,iBAAiB;IACjB,gBAAgB,EAAA;IAPhB;MAUC,2BAA2B,EAAA;EAI7B;IACC,eAAe;IACf,kBAAkB;IAClB,WAAW,EAAA;EAGZ;IACC,uBAAuB,EAAA;EAGxB;IACC,YAAY,EAAA;EAGV;IACF,UAAU,EAAA;IADP;MAIF,iBAAiB;MACjB,gBAAgB,EAAA;IALd;MASO,iBAAiB,EAAA;IATxB;MAaF,WAAW;MACX,YAAY;MACZ,eAAe;MACf,iBAAiB,EAAA;EA5DpB;IAiEE,gBAAgB;IAChB,gBAAgB,EAAA;;ACnElB;EACC,wEXUkE;EWTlE,kBAAkB;EAClB,UAAU;EACV,eAAe;EACf,OAAO;EACP,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,uBAAuB,EAAA;EATxB;IAYE,kBAAkB;IAClB,mBAAmB,EAAA;;ACbrB;EACI,iBAAiB;EACjB,aAAa;EACb,uBAAuB;EACvB,aAAa;EACb,qBAAqB,EAAA;EALzB;IAQQ,OAAO,EAAA;EARf;IAYQ,aAAa;IACb,wBAAwB;IACxB,8BAA8B,EAAA;EAdtC;IAkBQ,WAAW;IACX,iBAAiB,EAAA;EAGrB;IACI,aAAa;IACb,qBAAqB;IACrB,mBAAmB,EAAA;IAHtB;MAMO,gBAAgB,EAAA;EAIxB;IACI,UAAU;IACV,aAAa;IACb,iBAAiB;IACjB,aAAa;IACb,sBAAsB,EAAA;IALzB;MAQO,cAAc,EAAA;IARrB;MAYO,gBAAgB;MAChB,cZ7Ca,EAAA;MYgCpB;QAgBW,eAAe,EAAA;EAhD/B;IAsDQ,iBAAiB,EAAA;;ACtDzB;EACC,WAAW;EACX,gBAAgB;EAChB,kBAAkB,EAAA;EAElB;IACC,cAAc;IACd,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,aAAa;IACb,mBAAmB,EAAA;EAXrB;IAeE,gBAAgB,EAAA;;ACdd;EACI,aAAa;EACb,mBAAmB,EAAA;;AAGvB;EACI,eAAe,EAAA;;AAGnB;EACI,WAAW,EAAA;;AAGf;EACI,yBAAyB;EACzB,iBAAiB;EACjB,cAAc,EAAA;;AAGlB;EACI,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B,EAAA;EAJ9B;IAOO,WAAW,EAAA;;AC1BrB;EAEC,iBAAiB,EAAA;;AAInB;EACC,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,oBAAoB,EAAA;;AAbtB;EAiBE,eAAe;EACf,gBAAgB;EAChB,yBAAyB;EACzB,WAAW,EAAA;;AApBb;EAwBE,kBAAkB,EAAA;EAxBpB;IA2BG,kBAAkB,EAAA;IA3BrB;MA8BI,gBAAgB,EAAA;;AC7Bf;EAEO,gBAAgB;EAChB,eAAe;EACf,gBAAgB;EAChB,kBAAkB,EAAA;EALzB;IAQW,gBAAgB,EAAA;;AAK5B;EACI,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB,EAAA;EAJrB;IAOO,gBAAgB,EAAA;;AAIxB;EACI,qBAAqB,EAAA;;AC1B7B;EAEQ,gBAAgB;EAChB,8BAA8B,EAAA;;ACFpC;EAEC,iBAAiB,EAAA;;AAInB;EACC,iBAAiB;EACjB,kBAAkB,EAAA;EAFlB;IAKC,iBAAiB,EAAA;IALlB;MAQE,eAAe,EAAA;;AAKlB;EACC,cAAc,EAAA;;AArBhB;EAyBE,8BAA8B,EAAA;EAzBhC;IA4BG,aAAa;IACb,mBAAmB,EAAA;;AA7BtB;EAmCG,iBAAiB,EAAA;;AAnCpB;EAuCG,WAAW;EACX,aAAa;EACb,gBAAgB,EAAA;EAzCnB;IA4CI,SAAS;IACT,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB,EAAA;IA/C3B;MAkDK,mBlBlDoB;MkBmDpB,qBAAqB;MACrB,UAAU;MACV,kBAAkB;MAClB,WAAW;MACX,qBAAqB,EAAA;EAvD1B;IA4DI,gBAAgB,EAAA;;AA5DpB;EAkEI,gBAAgB,EAAA;;ACjEpB;EACI,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,aAAa,EAAA;EAJjB;IAOQ,4BAA4B,EAAA;;ACRpC;EAGE,aAAa;EACb,mBAAmB;EACnB,iBAAiB,EAAA;EALnB;IAQG,kBAAkB,EAAA;EARrB;IAYG,SAAS;IACT,gBAAgB,EAAA;IAbnB;MAgBI,gBAAgB;MAChB,WAAW;MACX,gBAAgB;MAChB,2BAA2B;MAC3B,iBAAiB,EAAA;EApBrB;IAyBG,gBAAgB;IAChB,SAAS;IACT,WAAW,EAAA;;AC3Bd;EACI,kBAAkB,EAAA;EAElB;IACI,aAAa;IACb,mBAAmB;IACnB,cAAc,EAAA;EAGlB;IACI,gBACJ,EAAA;EAXJ;IAeY,aAAa;IACb,qBAAqB;IACrB,mBAAmB,EAAA;IAjB/B;MAoBgB,mBAAmB,EAAA;IApBnC;MAwBgB,aAAa;MACb,mBAAmB;MACnB,oBAAoB,EAAA;MA1BpC;QA6BoB,iBAAiB,EAAA;IA7BrC;MAkCgB,iBAAiB,EAAA;;AAMjC;EACI,aAAa;EACb,qBAAqB;EACrB,kCAAkC,EAAA;EAHtC;IAMQ,YAAY,EAAA;IANpB;MASY,YAAY;MACZ,oBAAoB,EAAA;IAVhC;MAcY,aAAa;MACb,mBAAmB;MACnB,gBAAgB,EAAA;MAhB5B;QAmBgB,gBACJ,EAAA;;AC3DV;EAEC,iBAAiB,EAAA;;AAHpB;EAQE,eAAe;EACf,gBAAgB;EAChB,yBAAyB;EACzB,WAAW,EAAA;;AAXb;EAeE,kBAAkB,EAAA;EAfpB;IAkBG,kBAAkB,EAAA;IAlBrB;MAqBI,gBAAgB,EAAA;;ACpBhB;EACI,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,YAAY;EACZ,kBAAkB;EAClB,YAAY,EAAA;EANf;;IAUO,aAAa;IACb,mBAAmB,EAAA;IAX1B;;MAcW,gBAAgB,EAAA;;AAK5B;EACI,qBAAqB,EAAA;;ACrB7B;EACI,aAAa,EAAA;;ACDjB;EACC,aAAa;EACb,kBAAkB;EAClB,aAAa;EACb,cAAc;EACd,WAAW;EACX,mBzBHiC;EyBIjC,0BAA0B;EAC1B,yBAAyB;EACzB,sDAAsD,EAAA;EAEtD;IACC,WAAW;IACX,aAAa;IACb,kBAAkB;IAClB,UAAU;IACV,gGAAgG;IAChG,kBAAkB;IAClB,iBAAiB;IACjB,sBAAsB;IACtB,mBzBpBuB;IyBqBvB,czBlBgC;IyBmBhC,aAAa;IACb,iBAAiB;IACjB,8BAA8B,EAAA;IAb9B;MAgBC,YAAY,EAAA;IAhBb;MAoBC,cAAc,EAAA;IApBf;MAwBC,cAAc,EAAA;MAxBf;QA2BE,WAAW;QACX,YAAY;QACZ,eAAe,EAAA;EAKlB;IACC,kBAAkB;IAClB,UAAU;IACV,MAAM;IACN,UAAU;IACV,aAAa;IACb,QAAQ;IACR,cAAc;IACd,mBzBlDgC;IyBmDhC,UAAU;IACV,SAAS;IACT,uBAAuB;IACvB,qBAAqB;IACrB,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB;IAClB,yBAAyB;IACzB,sDAAsD;IACtD,sCAAsC,EAAA;IAlBtC;MAqBC,kBAAkB;MAClB,YAAY,EAAA;IAtBb;MA0BC,YAAY;MACZ,kBAAkB;MAClB,aAAa;MACb,sBAAsB;MACtB,4CAAyC;MACzC,aAAa;MACb,qBAAqB;MACrB,mBAAmB,EAAA;MAjCpB;QAoCE,WAAW;QACX,gBAAgB;QAChB,iBAAiB;QACjB,kCzBlFsC;QyBmFtC,4BAA4B;QAC5B,sBAAsB;QACtB,kBAAkB;QAClB,gBAAgB,EAAA;QA3ClB;UA8CG,iBAAiB,EAAA;QA9CpB;UAkDG,WAAW,EAAA;MAlDd;QAuDE,SAAS;QACT,gBAAgB;QAChB,sBAAsB;QACtB,yBAAyB;QACzB,eAAe,EAAA;IA3DjB;MAgEC,eAAe,EAAA;MAhEhB;QAmEE,cAAc,EAAA;QAnEhB;UAsEG,aAAa;UACb,mBAAmB;UACnB,iBAAiB;UACjB,aAAa;UACb,gBAAgB;UAChB,gBAAgB;UAChB,YAAY;UACZ,sBAAsB;UACtB,4BAA4B;UAC5B,kBAAkB;UAClB,gBAAgB;UAChB,eAAe;UACf,iBAAiB;UACjB,sBAAsB,EAAA;UAnFzB;YAsFI,kCzBlIgC,EAAA;UyB4CpC;YA0FI,0BAA0B,EAAA;QA1F9B;UA+FG,czB5IoB;UyB6IpB,kCzB5IiC,EAAA;UyB4CpC;YAmGI,czBhJmB,EAAA;;AyBwJzB;EACC,iBAAiB,EAAA;EADlB;IAIE,SAAS;IACT,iBAAiB;IACjB,aAAa;IACb,gBAAgB,EAAA;EAPlB;IAWE,SAAS;IACT,gBAAgB;IAChB,WAAW,EAAA;;ACrKb;EACC,YAAY,EAAA;EAEZ;IACC,aAAa;IACb,mBAAmB;IACnB,0BAA0B,EAAA;IAH1B;MAMC,iBAAiB,EAAA;IANlB;MAUC,SAAS,EAAA;EAIX;IACC,2BAA2B,EAAA;;AClB7B;EACC,kBAAkB,EAAA;EAElB;IACC,eAAe;IACf,mBAAmB;IACnB,YAAY;IACZ,YAAY;IACZ,aAAa,EAAA;EAGd;IACC,eAAe;IACf,QAAQ;IACR,SAAS;IACT,gCAAgC;IAC1B,kBAAkB,EAAA;IALxB;MAQU,kBAAkB;MAClB,QAAQ;MACR,SAAS;MACT,gCAAgC;MAChC,UAAU,EAAA;EAIlB;IACI,cAAc;IACd,WAAW;IACX,YAAY;IACZ,YAAY,EAAA;EA/BpB;IAmCQ,YAAY;IACZ,aAAa;IACb,qBAAqB,EAAA;IArC7B;MAwCY,YAAY,EAAA;IAxCxB;MA4CY,UAAU,EAAA;IA5CtB;MAgDY,WAAW;MACX,YAAY,EAAA;;AChDtB;EAEC,iBAAiB,EAAA;EAFlB;IAOI,UAAU;IACV,kBAAkB,EAAA;IARtB;MAWK,UAAU;MACV,mBAAmB,EAAA;EAZxB;IAiBK,UAAU;IACV,mBAAmB,EAAA;;AAQ1B;EACC,yBAA6B,EAAA;;AC5B9B;EACI,cAAc,EAAA;EADlB;IAIQ,aAAa;IACb,kBAAkB;IAClB,uBAAuB,EAAA;EAG3B;IACI,eAAe,EAAA;EAGnB;IACI,WAAW;IACX,aAAa;IACb,cAAc;IACd,mBAAmB;IACnB,8BAA8B,EAAA;IALjC;MAQO,SAAS,EAAA;MARhB;QAWW,gBAAgB,EAAA;IAX3B;MAgBO,aAAa;MACb,cAAc;MACd,mBAAmB,EAAA;EA/B/B;IAoCQ,YAAY;IACZ,kBAAkB;IAClB,QAAQ;IACR,UAAU;IACV,aAAa;IACb,gBAAgB;IAChB,kBAAkB;IAClB,YAAY,EAAA;IA3CpB;MA8CY,YAAY;MACZ,kBAAkB,EAAA;IA/C9B;MAmDY,aAAa;MACb,mBAAmB;MACnB,8BAA8B;MAC9B,sBAAsB,EAAA;MAtDlC;QAyDgB,SAAS,EAAA;MAzDzB;QA6DgB,aAAa;QACb,cAAc,EAAA;QA9D9B;UAiEoB,gBAAgB,EAAA;UAjEpC;YAoEwB,cAAc,EAAA;IApEtC;MA2EY,aAAa;MACb,qBAAqB;MACrB,qBAAqB,EAAA;MA7EjC;QAgFgB,gBAAgB,EAAA;IAhFhC;MAqFY,aAAa;MACb,qBAAqB;MACrB,kBAAkB,EAAA;MAvF9B;QA0FgB,gBAAgB,EAAA;QA1FhC;UA6FoB,cAAc,EAAA;QA7FlC;UAiGoB,YAAY,EAAA;MAjGhC;QAsGgB,mBAAmB,EAAA;IAtGnC;MA2GY,aAAa;MACb,qBAAqB;MACrB,yBAAyB,EAAA;;AC5GhC;EAEO,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB,EAAA;EALzB;IAQW,iBAAiB;IACjB,kBAAkB,EAAA;IAT7B;MAYe,gCAA6B,EAAA;;AAQ7C;EACI,aAAa;EACb,8BAA8B;EAC9B,aAAa,EAAA;;AAJrB;EAQQ,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,eAAe,EAAA;EAXvB;IAcY,0B9BlCa,EAAA;E8BoBzB;IAkBY,gBAAgB;IAChB,SAAS,EAAA;EAnBrB;IAuBY,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,iBAAiB,EAAA;;AC9C7B;EACC,aAAa;EACb,6BAA6B;EAC7B,mBAAmB,EAAA;EAHpB;IAME,aAAa;IACb,UAAU,EAAA;IAPZ;MAUG,2BAA2B,EAAA;EAI7B;IACC,YAAY;IACZ,iBAAiB;IACjB,aAAa;IACb,mBAAmB;IACnB,8BAA8B,EAAA;IAL9B;MAQC,aAAa,EAAA;MARd;QAUE,iBAAiB,EAAA;QAVnB;UAaG,cAAc,EAAA;IAbjB;MAmBC,SAAS,EAAA;EAIX;IACC,aAAa;IACb,mBAAmB;IACnB,qBAAqB,EAAA;IAHrB;MAMC,gBAAgB,EAAA;;AlCFnB,UAAA","file":"main.scss","sourcesContent":["/* Main */\r\n@import \"common/global\";\r\n@import \"common/variables\";\r\n@import \"common/colors\";\r\n\r\n/* Layout */\r\n@import \"layouts/app\";\r\n@import \"layouts/drawer\";\r\n@import \"layouts/form\";\r\n@import \"layouts/login\";\r\n@import \"layouts/router\";\r\n\r\n\r\n/* Components */\r\n@import \"components/about\";\r\n@import \"components/banner\";\r\n@import \"components/calendar\";\r\n@import \"components/check-in\";\r\n@import \"components/chip_select\";\r\n@import \"components/content\";\r\n@import \"components/date_widget\";\r\n@import \"components/empty_state\";\r\n@import \"components/expansion_panel\";\r\n@import \"components/items_modal\";\r\n@import \"components/modal_section\";\r\n@import \"components/not_found\";\r\n@import \"components/notifications_modal\";\r\n@import \"components/power_scheduler\";\r\n@import \"components/profile\";\r\n@import \"components/report\";\r\n@import \"components/search_modal\";\r\n@import \"components/selectable_list\";\r\n@import \"components/settings\";\r\n@import \"components/sidebar\";\r\n@import \"components/sidebar_modal\";\r\n@import \"components/splash\";\r\n@import \"components/starred\";\r\n@import \"components/table\";\r\n@import \"components/topics\";\r\n@import \"components/topnav\";\r\n\r\n/* D3.js */\r\n@import \"d3/calendar_view\";\r\n","body {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tfont-family: 'Segoe UI', 'Roboto', sans-serif\r\n}\r\n\r\nul {\r\n\tlist-style: none;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\na {\r\n\ttext-decoration: none;\r\n\tcolor: inherit;\r\n\r\n\t&:hover,\r\n\t&:active,\r\n\t&:focus {\r\n\t\toutline: none;\r\n\t}\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6, p {\r\n\tmargin: 0 0 8px 0;\r\n}",".colors_dialog .color__swatch,\r\n.topics_dialog .color_swatch,\r\n.nav_avatar,\r\n.student_avatar,\r\n.profile_avatar,\r\n.chip_avatar,\r\n.login_avatar {\r\n    &.--red {\r\n        background: $red;\r\n    }\r\n\r\n    &.--pink {\r\n        background: $pink;\r\n    }\r\n\r\n    &.--purple {\r\n        background: $purple;\r\n    }\r\n\r\n    &.--deep-purple {\r\n        background: $deep-purple;\r\n    }\r\n\r\n    &.--indigo {\r\n        background: $indigo;\r\n    }\r\n\r\n    &.--blue {\r\n        background: $blue;\r\n    }\r\n\r\n    &.--light-blue {\r\n        background: $light-blue;\r\n    }\r\n\r\n    &.--cyan {\r\n        background: $cyan;\r\n    }\r\n\r\n    &.--teal {\r\n        background: $teal;\r\n    }\r\n\r\n    &.--green {\r\n        background: $green;\r\n    }\r\n\r\n    &.--light-green {\r\n        background: $light-green;\r\n    }\r\n\r\n    &.--lime {\r\n        background: $lime;\r\n    }\r\n\r\n    &.--yellow {\r\n        background: $yellow;\r\n    }\r\n\r\n    &.--amber {\r\n        background: $amber;\r\n    }\r\n\r\n    &.--orange {\r\n        background: $orange;\r\n    }\r\n\r\n    &.--deep-orange {\r\n        background: $deep-orange;\r\n    }\r\n\r\n    &.--brown {\r\n        background: $brown;\r\n    }\r\n\r\n    &.--blue-grey {\r\n        background: $blue-grey;\r\n    }\r\n\r\n    &.--black {\r\n        background: $black;\r\n    }\r\n}\r\n\r\n.chip_avatar {\r\n    color: $on-primary !important;\r\n}\r\n","$primary: rgb(3, 70, 112);\r\n$primary-light: rgba(3, 70, 112, 0.12);\r\n$primary-semi-light: rgba(3, 70, 112,0.54);\r\n$primary-white: rgb(227, 233, 238);\r\n\r\n$secondary: rgb(67, 224, 255);\r\n$secondary-light: rgba(67, 224, 255, 0.12);\r\n$secondary-semi-light: rgba(67, 224, 255, 0.54);\r\n\r\n$on-primary: rgba(255, 255, 255, 0.87);\r\n\r\n$elevation1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\r\n$elevation2: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n\r\n$star-color: rgba(255,214,0 ,1);\r\n$success: rgba(76,175,80 ,1);\r\n$failure: rgba(244,67,54 ,1);\r\n$warning: rgba(255,152,0 ,1);\r\n\r\n// App Colors\r\n$red: rgb(198,40,40);\r\n$pink: rgb(173,20,87);\r\n$purple: rgb(106,27,154);\r\n$deep-purple: rgb(69,39,160);\r\n$indigo: rgb(40,53,147);\r\n$blue: rgb(21,101,192);\r\n$light-blue: rgb(2,119,189);\r\n$cyan: rgb(0,131,143);\r\n$teal: rgb(0,105,92);\r\n$green: rgb(46,125,50);\r\n$light-green: rgb(85,139,47);\r\n$lime: rgb(158,157,36);\r\n$yellow: rgb(249,168,37);\r\n$amber: rgb(255,143,0);\r\n$orange: rgb(239,108,0);\r\n$deep-orange: rgb(216,67,21);\r\n$brown: rgb(78,52,46);\r\n$blue-grey: rgb(55,71,79);\r\n$black: rgb(0,0,0);\r\n$on-color: rgba(255,255,255,1);\r\n",".site-wrap {\r\n\tdisplay: flex;\r\n\r\n\t.sidebar:hover {\r\n\t\t.sidebar__nav:not(:hover) ~ .sidebar__menu {\r\n\t\t\twidth: 260px;\r\n\t\t\tpadding: 0 2px;\r\n\t\t\tbox-shadow: $elevation2;\r\n\t\t}\r\n\t}\r\n\r\n\t&.--menu_open .sidebar {\r\n\t\twidth: 328px;\r\n\r\n\t\t.sidebar__menu {\r\n\t\t\twidth: 260px;\r\n\t\t\tpadding: 0 0 0 2px;\r\n\t\t\tbox-shadow: none !important;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.--flex-row {\r\n\tdisplay: flex;\r\n\tflex-flow: row nowrap;\r\n\talign-items: center;\r\n\r\n\t& > * + * {\r\n\t\tmargin-left: 8px !important;\r\n\t}\r\n}\r\n\r\n.sysadmin_badge {\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\tpadding: 4px;\r\n\tbox-sizing: border-box;\r\n\tdisplay: inline-block;\r\n\tmargin: 0 8px;\r\n\tbackground: #EEE;\r\n    border-radius: 50%;\r\n\r\n\t&::after {\r\n\t\tcontent: \"\";\r\n\t\tbackground: url('/static/images/ft-badge.png') no-repeat;\r\n\t\tbackground-position: center;\r\n\t\tbackground-size: cover;\r\n\t\twidth: 16px;\r\n\t\theight: 16px;\r\n\t\tdisplay: block;\r\n\t}\r\n}\r\n",".drawer {\r\n    background: #EEE;\r\n    position: fixed;\r\n    z-index: 300;\r\n    top: 0;\r\n    right: -236px;\r\n    width: 260px;\r\n    height: 100vh;\r\n    padding: 16px 24px;\r\n    box-sizing: border-box;\r\n    box-shadow: $elevation2;\r\n    transition-duration: 0.2s;\r\n    transition-property: right;\r\n\r\n    &.--open  ~ .content {\r\n        margin-right: 260px;   \r\n    }\r\n\r\n    &.--open,\r\n    &:hover {\r\n        right: 0;\r\n    }\r\n\r\n    &__topbar {\r\n        height: 48px;\r\n        padding: 0 0 016px;\r\n        box-sizing: content-box;\r\n        border-bottom: 1px solid #DDD;\r\n        margin-bottom: 16px;\r\n\r\n        & > * {\r\n            line-height: 48px !important;\r\n        }\r\n    }\r\n\r\n    &__loading {\r\n        position: absolute;\r\n        top: calc(50% + 64px);\r\n        top: 50%;\r\n        left: 50%;\r\n        transform: translate(-50%, -50%);\r\n    }\r\n}\r\n\r\n.report_name_widget {\r\n    padding: 8px 0;\r\n    position: relative;\r\n\r\n    &__input {\r\n        font: inherit;\r\n        padding: 8px 0;\r\n        margin: -2px;\r\n        min-width: 12px;\r\n    }\r\n\r\n    &__hidden {\r\n        position: absolute;\r\n        height: 0;\r\n        overflow: hidden;\r\n        white-space: pre;\r\n    }\r\n\r\n    &__helper {\r\n        position: absolute;\r\n        left: 0;\r\n        top: 56px;\r\n        color: $failure !important;\r\n    }\r\n\r\n    &.--edit {\r\n        padding: 0;\r\n    }\r\n\r\n    &.--error,\r\n    &.--error input,\r\n    &__helper {\r\n        width: 200px !important;\r\n    }\r\n}\r\n",".dialog-title {\r\n\t&__content {\r\n\t\theight: 64px;\r\n\t\twidth: 600px;\r\n\t\tbox-sizing: border-box;\r\n\t\tpadding: 16px 24px;\r\n\t\tline-height: 64px;\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\t.icon-close {\r\n\t\tmargin-left: 16px;\r\n\t}\r\n\r\n\th3 {\r\n\t\tmargin: 0;\r\n\t}\r\n\r\n\t&.--close-button {\r\n\t\t.dialog-title__content {\r\n\t\t\tpadding: 16px 16px 16px 24px;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.dialog-form {\r\n\t&__row {\r\n\t\tdisplay: flex;\r\n\r\n\t\t& > * + * {\r\n\t\t\tmargin-left: 8px !important;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.clusters-dialog {\r\n    .dialog-title {\r\n\t\twidth: unset;\r\n\t}\r\n}\r\n\r\n.stepper-actions {\r\n\t& > * + * {\r\n\t\tmargin-left: 8px !important;\r\n\t}\r\n}\r\n\r\n.button-container {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n\r\n\t.button-progress {\r\n\t\tposition: absolute;\r\n\t\ttop: 50%;\r\n\t\tleft: 50%;\r\n\t\tmargin-top: -12px;\r\n\t\tmargin-left: -12px;\r\n\t}\r\n}\r\n\r\n.menu-item-container {\r\n\tposition: relative;\r\n\tdisplay: block;\r\n\tpadding-left: 0;\r\n\ttransition: padding 0.2s;\r\n\r\n\t&.--loading {\r\n\t\tpadding-left: 32px;\r\n\t}\r\n\r\n\t.menu-item-progress {\r\n\t\tposition: absolute;\r\n\t\ttop: 50%;\r\n\t\tleft: 28px;\r\n\t\tmargin-top: -12px;\r\n\t\tmargin-left: -12px;\r\n\t}\r\n}\r\n\r\n.chips_container {\r\n\tdisplay: flex;\r\n\tjustify-content: flex-start;\r\n\tflex-wrap: wrap;\r\n\tmargin-bottom: 8px;\r\n\r\n\t& > * {\r\n\t\tmargin: 4px;\r\n\t}\r\n}\r\n\r\n.change_password_card {\r\n\ttext-align: left;\r\n\tmax-width: 600px;\r\n}\r\n\r\n.check-in_error_header {\r\n\tfont-size: 16px;\r\n}\r\n\r\n.check-in_error {\r\n\tfont-weight: 500;\r\n\tcolor: #888;\r\n\tfont-family: monospace;\r\n}\r\n\r\n.password_confirm_dialog_list {\r\n\tpadding-left: 32px;\r\n    list-style: initial;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.info_tooltip {\r\n\tdisplay: flex;\r\n\tflex-flow: row wrap;\r\n\talign-items: center;\r\n\r\n\t& > * + * {\r\n\t\tmargin: 0 8px;\r\n\t}\r\n\r\n\tspan {\r\n\t\tcolor: rgba(0,0,0,0.3);\r\n\t}\r\n}\r\n",".login {\r\n\twidth: 100%;\r\n\theight: 100vh;\r\n\tcolor: rgba(255, 255, 255, 0.87);\r\n\tdisplay: grid;\r\n\tgrid-template-columns: 2fr 1fr;\r\n\r\n\t&__image_container {\r\n\t\twidth: 100%;\r\n\t\tposition: relative;\r\n\t\toverflow: hidden;\r\n\r\n\t\t.login_image {\r\n\t\t\tposition: absolute;\r\n\t\t\theight: 100%;\r\n\t\t\ttop: 50%;\r\n\t\t\tleft: 50%;\r\n\t\t\ttransform: translate(-50%, -50%);\r\n\r\n\t\t\t&.--vertical {\r\n\t\t\t\theight: unset;\r\n\t\t\t\twidth: 100%;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t&__panel {\r\n\t\tbackground: $primary;\r\n\t\theight: 100vh;\r\n\t\tposition: relative;\r\n\t\tmin-width: 490px;\r\n\r\n\t\t.ft-logo {\r\n\t\t\theight: 48px;\r\n\t\t\twidth: 48px;\r\n\t\t}\r\n\r\n\t\t.logos-container {\r\n\t\t\theight: 48px;\r\n\t\t\tmargin: 0 auto 32px;\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\r\n\t\t\t.cross {\r\n\t\t\t\tfont-size: 32px;\r\n\t\t\t\tline-height: 16px;\r\n\t\t\t\tdisplay: inline-table;\r\n\t\t\t\tmargin: 0 8px;\r\n\t\t\t\tfont-weight: 400;\r\n\t\t\t\tcolor: #DDD;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t.login_container {\r\n\t\t\twidth: 360px;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 50%;\r\n\t\t\tleft: 50%;\r\n\t\t\ttransform: translate(-50%, -50%);\r\n\r\n\t\t\th2 {\r\n\t\t\t\tmargin: 0 0 16px 0;\r\n\t\t\t}\r\n\r\n\t\t\t.school_logo {\r\n\t\t\t\tdisplay: flex;\r\n\t\t\t\tflex-flow: row;\r\n\t\t\t\talign-items: center;\r\n\t\t\t\tjustify-content: center;\r\n\t\t\t\tline-height: 24px;\r\n\r\n\t\t\t\timg {\r\n\t\t\t\t\tmargin-right: 8px;\r\n\t\t\t\t\theight: 48px;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\th3 {\r\n\t\t\t\t\tfont-weight: 500;\r\n\t\t\t\t\tmargin: 0;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\r\n\t\t\t.subtitle_link {\r\n\t\t\t\tmargin: 0 0 16px 0;\r\n\t\t\t\tcolor: rgba(225,225,225,0.86);\r\n\t\t\t\tfont-weight: 700;\r\n\t\r\n\t\t\t\t&:hover {\r\n\t\t\t\t\ttext-decoration: underline;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\r\n\t\t\t.login_form {\r\n\t\t\t\tpadding: 32px;\r\n\t\t\t\tmargin: 32px 0 16px;\r\n\t\r\n\t\t\t\th2 {\r\n\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t\ttext-align: center;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t.links_list {\r\n\t\t\tlist-style: none;\r\n\t\t\tmargin: 0;\r\n\t\t\tpadding: 0;\r\n\t\t\tdisplay: flex;\r\n\t\t\tjustify-content: flex-end;\r\n\r\n\t\t\tli {\r\n\t\t\t\tmargin: 0 0 0 16px;\r\n\t\t\t\tfont-weight: 500;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t.auth-username {\r\n\t\tdisplay: block;\r\n\t\tmargin: 0 auto;\r\n\t\tfont-weight: 400 !important;\r\n\t\ttext-transform: unset !important;\r\n\r\n\t\t&__inner {\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\ttext-transform: inherit;\r\n\r\n\t\t\t& > * + * {\r\n\t\t\t\tmargin-left: 8px;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.login_avatar {\r\n\twidth: 32px !important;\r\n\theight: 32px !important;\r\n\tfont-size: 14px !important;\r\n}\r\n\r\n.auth-username__list-item {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\r\n\t& > * + * {\r\n\t\tmargin-left: 4px !important;\r\n\t}\r\n}",".router_page {\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n\r\n.fade-appear,\r\n.fade-enter {\r\n    opacity: 0;\r\n    z-index: 1;\r\n}\r\n\r\n.fade-appear-active,\r\n.fade-enter.fade-enter-active {\r\n    opacity: 1;\r\n    transition: opacity 300ms linear 150ms;\r\n}\r\n\r\n.fade-exit {\r\n    opacity: 1;\r\n}\r\n\r\n.fade-exit.fade-exit-active {\r\n    opacity: 0;\r\n    transition: opacity 150ms linear;\r\n}\r\n\r\n.slide-appear,\r\n.slide-enter {\r\n    transform: translate(100%, 0);\r\n    z-index: 1;\r\n}\r\n\r\n.slide-appear-active,\r\n.slide-enter.slide-enter-active {\r\n    transform: translate(0, 0);\r\n    transition-duration: 300ms;\r\n    transition-property: transform;\r\n    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);\r\n}\r\n\r\n.slide-exit {\r\n    opacity: 1;\r\n}\r\n\r\n.slide-exit.slide-exit-active {\r\n    transform: translate(-100%, 0);\r\n    transition-duration: 300ms;\r\n    transition-property: transform;\r\n    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);\r\n}\r\n",".about-spotlight {\r\n    text-align: center;\r\n\r\n    &__logo {\r\n        width: 450px;\r\n        height: 64px;\r\n        background-image: url(\"/static/images/ft-logo.svg\");\r\n        background-repeat: no-repeat;\r\n        background-position: center;\r\n        margin-bottom: 16px;\r\n    }\r\n\r\n    &__name {\r\n        margin: 8px 0 !important;\r\n    }\r\n\r\n    &__version {\r\n        font-weight: 400;\r\n        span {\r\n            font-weight: 500;\r\n        }\r\n    }\r\n}\r\n",".banner {\r\n    background: #FFF;\r\n    z-index: 100;\r\n\r\n    &.--dynamic {\r\n        position: fixed;\r\n\r\n        .banner__content {\r\n            width: 100vw;\r\n        }\r\n    }\r\n\r\n    &.--icon {\r\n        .banner__content {\r\n            padding: 16px 8px 8px 16px;\r\n        }\r\n\r\n        .banner__message {\r\n            margin-bottom: 8px;\r\n        }\r\n    }\r\n\r\n    &__content {\r\n        width: 100%;\r\n        display: flex;\r\n        flex-flow: row nowrap;\r\n        justify-content: space-between;\r\n        box-sizing: border-box;\r\n        padding: 24px 8px 8px 24px;\r\n    }\r\n\r\n    &__message {\r\n        display: flex;\r\n        align-items: center;\r\n        margin-bottom: 16px;\r\n    }\r\n\r\n    &__actions {\r\n        padding-left: 90px;\r\n        display: flex;\r\n        flex-flow: row nowrap;\r\n        align-items: flex-end;\r\n\r\n        & > * + * {\r\n            margin-left: 8px;\r\n        }\r\n    }\r\n\r\n    &__avatar {\r\n        margin-right: 24px;\r\n    }\r\n}\r\n",".calendar_header {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\r\n\tli {\r\n\t\tmargin-right: 8px;\r\n\t}\r\n}\r\n\r\n.calendar_container {\r\n\t.calendar {\r\n\t\twidth: 100%;\r\n\t\tpadding: 16px 0 0 0;\r\n\t\tdisplay: flex;\r\n\t\tflex-flow: row wrap;\r\n\r\n\t\t.calendar_row {\r\n\t\t\twidth: 100%;\r\n\t\t\tdisplay: flex;\r\n\r\n\t\t\t.event,\r\n\t\t\t.block {\r\n\t\t\t\tmargin: 0 0 16px 8px !important;\r\n\t\t\t\tfont-family: unset;\r\n\r\n\t\t\t\t&__badge {\r\n\t\t\t\t\tdisplay: block;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t&__inner {\r\n\t\t\t\t\tbackground: #EEE;\r\n\t\t\t\t\tcolor: rgba(0,0,0,0.87);\r\n\t\t\t\t\tfont-family: unset;\r\n\r\n\t\t\t\t\t&.--red {\r\n\t\t\t\t\t\tbackground: $red;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--pink {\r\n\t\t\t\t\t\tbackground: $pink;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--purple {\r\n\t\t\t\t\t\tbackground: $purple;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--deep-purple {\r\n\t\t\t\t\t\tbackground: $deep-purple;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--indigo {\r\n\t\t\t\t\t\tbackground: $indigo;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--blue {\r\n\t\t\t\t\t\tbackground: $blue;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--light-blue {\r\n\t\t\t\t\t\tbackground: $light-blue;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--cyan {\r\n\t\t\t\t\t\tbackground: $cyan;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--teal {\r\n\t\t\t\t\t\tbackground: $teal;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--green {\r\n\t\t\t\t\t\tbackground: $green;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--light-green {\r\n\t\t\t\t\t\tbackground: $light-green;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--lime {\r\n\t\t\t\t\t\tbackground: $lime;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--yellow {\r\n\t\t\t\t\t\tbackground: $yellow;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--amber {\r\n\t\t\t\t\t\tbackground: $amber;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--orange {\r\n\t\t\t\t\t\tbackground: $orange;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--deep-orange {\r\n\t\t\t\t\t\tbackground: $deep-orange;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--brown {\r\n\t\t\t\t\t\tbackground: $brown;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\t&.--blue-grey {\r\n\t\t\t\t\t\tbackground: $blue-grey;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\t&.--black {\r\n\t\t\t\t\t\tbackground: $black;\r\n\t\t\t\t\t\tcolor: $on-color;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\r\n\t\t\t\t&__content {\r\n\t\t\t\t\tfont-size: 12px;\r\n\t\t\t\t\tpadding: 16px 12px;\r\n\t\t\t\t\tmin-height: 96px;\r\n\t\t\t\t}\r\n\r\n\t\t\t\t&__label {\r\n\t\t\t\t\tfont-size: 10px;\r\n\t\t\t\t\tfont-weight: 500;\r\n\t\t\t\t\tmargin-bottom: 4px;\r\n\t\t\t\t\ttext-transform: uppercase;\r\n\t\t\t\t\tletter-spacing: 0.025rem;\r\n\t\t\t\t}\r\n\r\n\t\t\t\t&__title {\r\n\t\t\t\t\tfont-weight: 500;\r\n\t\t\t\t\tline-height: 14px;\r\n\t\t\t\t\tmargin-bottom: 4px;\r\n\t\t\t\t}\r\n\r\n\t\t\t\t&__memo {\r\n\t\t\t\t\tline-height: 14px;\r\n\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t\tmargin: 0;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t.label {\r\n\t\t\t\twidth: 100%;\r\n\t\t\t\tcolor: inherit;\r\n\t\t\t\tpadding: 8px 16px;\r\n\t\t\t\ttext-align: center;\r\n\r\n\t\t\t\t.day {\r\n\t\t\t\t\ttext-transform: uppercase;\r\n\t\t\t\t\tmargin: 0 0 4px 0;\r\n\t\t\t\t\tfont-weight: 500;\r\n\t\t\t\t}\r\n\r\n\t\t\t\t.date {\r\n\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\tmargin: 0;\r\n\t\t\t\t\twidth: 32px;\r\n\t\t\t\t\theight: 32px;\r\n\t\t\t\t\tline-height: 32px;\r\n\t\t\t\t\tpadding: 8px;\r\n\t\t\t\t\tborder-radius: 50%;\r\n\t\t\t\t\tbackground: none;\r\n\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t}\r\n\r\n\t\t\t\t&.--today {\r\n\t\t\t\t\tcolor: $primary;\r\n\r\n\t\t\t\t\t.date {\r\n\t\t\t\t\t\tbackground: $primary;\r\n\t\t\t\t\t\tcolor: rgba(255,255,255,0.87);\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t.calendar_events {\r\n\t\t\t\twidth: 100%;\r\n\t\t\t\tpadding: 8px 0 0 0;\r\n\t\t\t\tborder-right: 1px solid #EEE;\r\n\t\t\t\tborder-bottom: 1px solid #EEE;\r\n\t\t\t\tdisplay: flex;\r\n\t\t\t\tflex-flow: column-reverse;\r\n\r\n\t\t\t\t&:last-child {\r\n\t\t\t\t\tborder-right: none;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t.calendar_blocks {\r\n\t\t\t\twidth: 100%;\r\n\t\t\t\tpadding: 8px 16px 16px 0;\r\n\t\t\t\tborder-right: 1px solid #EEE;\r\n\r\n\t\t\t\t&:last-child {\r\n\t\t\t\t\tborder-right: none;\r\n\t\t\t\t}\r\n\r\n\t\t\t\t.block__inner {\t\t\r\n\t\t\t\t\t&.--missed {\r\n\t\t\t\t\t\tbackground: $failure;\r\n\t\t\t\t\t\tcolor: rgba(255,255,255,0.87)\r\n\t\t\t\t\t}\r\n\t\t\r\n\t\t\t\t\t&.--attended {\r\n\t\t\t\t\t\tbackground: $success;\r\n\t\t\t\t\t\tcolor: rgba(255,255,255,0.87);\r\n\t\t\t\t\t}\r\n\t\t\r\n\t\t\t\t\t&.--appointed {\r\n\t\t\t\t\t\tbackground: $warning;\r\n\t\t\t\t\t\tcolor: rgba(255,255,255,0.87);\r\n\t\t\t\t\t}\r\n\t\t\r\n\t\t\t\t\t&.--now {\r\n\t\t\t\t\t\tborder: 3px solid $primary-semi-light;\r\n\t\t\t\t\t\tborder-radius: 4px;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\t&.--void {\r\n\t\t\t\t\t\tbackground: #CCC;\r\n\t\t\t\t\t\tcolor: rgba(75,75,75,0.87);\r\n\r\n\t\t\t\t\t\t.block__label {\r\n\t\t\t\t\t\t\ttext-decoration: line-through;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.calendar-block-dialog {\r\n\t&__title {\r\n\t\twidth: 600px;\r\n\t\t.dialog-title__content {\r\n\t\t\theight: 86px;\r\n\t\t\twidth: unset;\r\n\t\t}\r\n\r\n\t\t.dialog-title__inner {\r\n\t\t\tline-height: 16px;\r\n\r\n\t\t\t.label {\r\n\t\t\t\ttext-transform: uppercase;\r\n\t\t\t\tletter-spacing: 0.025px;\r\n\r\n\t\t\t\tspan {\r\n\t\t\t\t\ttext-transform: unset;\r\n\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t\tpadding-left: 8px;\r\n\t\t\t\t\tmargin-left: 8px;\r\n\t\t\t\t\tborder-left: 2px solid #888;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t.date {\r\n\t\t\t\tfont-weight: 400;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t.section-header {\r\n\t\tcolor: rgba(0,0,0,0.87);\r\n\t\ttext-transform: uppercase;\r\n\t\tmargin: 0 0 12px 0;\r\n\t}\r\n\r\n\t.section {\r\n\t\tpadding-left: 16px;\r\n\t\tmargin-bottom: 16px;\r\n\t}\r\n\r\n\t.empty_text {\r\n\t\tfont-style: italic;\r\n\t}\r\n}\r\n\r\n.calendar_item {\r\n\tdisplay: flex;\r\n\tflex-flow: row;\r\n\tline-height: 24px;\r\n\tjustify-content: space-between;\r\n\tpadding: 8px 16px;\r\n\tposition: relative;\r\n\tbox-shadow: $elevation1;\r\n\tborder-radius: 4px;\r\n\r\n\t&__container {\r\n\t\t& + .calendar_item__container,\r\n\t\t& + * .calendar_item__container {\r\n\t\t\tmargin-top: 8px;\r\n\t\t}\r\n\t}\r\n\r\n\t&__title {\r\n\t\tdisplay: flex;\r\n\t\tfont-size: unset;\r\n\t\tfont-weight: 500;\r\n\t\tmargin: 0;\r\n\t\t\r\n\t\t& > span {\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tmargin-left: 8px;\r\n\t\t\tpadding-left: 8px;\r\n\t\t\tborder-left: 1px solid #888;\r\n\t\t\tcolor: #888;\r\n\t\t\tfont-weight: 400;\r\n\r\n\t\t\t.icon {\r\n\t\t\t\tmargin-left: 8px;\r\n\t\t\t\tcursor: pointer;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t&__memo {\r\n\t\tdisplay: flex;\r\n\t\tflex-flow: row wrap;\r\n\t\talign-items: center;\r\n\r\n\t\tp {\r\n\t\t\tmargin: 0;\r\n\t\t}\r\n\r\n\t\t& > * + p {\r\n\t\t\tmargin-left: 8px;\r\n\t\t}\r\n\t}\r\n\r\n\t&__actions {\r\n\t\tmargin-left: 16px;\r\n\t\tdisplay: flex;\r\n\t\tflex-flow: row;\r\n\t\talign-items: center;\r\n\t}\r\n\r\n\t&::after {\r\n\t\tbackground: #EEE;\r\n\t\tcontent: '';\r\n\t\twidth: 8px;\r\n\t\theight: 100%;\r\n\t\tposition: absolute;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\tborder-radius: 4px 0 0 4px;\r\n\t}\r\n\r\n\t&.--selectable {\r\n\t\tcursor: pointer;\r\n\t\tuser-select: none;\r\n\t}\r\n\r\n\t&.--disabled {\r\n\t\tcolor: #444;\r\n\t\tbackground: #EEE;\r\n\t\tcursor: default;\r\n\t}\r\n\r\n\t&.--success::after {\r\n\t\tbackground: $success;\r\n\t}\r\n\r\n\t&.--fail::after {\r\n\t\tbackground: $failure;\r\n\t}\r\n\r\n\t&.--red::after {\r\n\t\tbackground: $red;\r\n\t}\r\n\r\n\t&.--pink::after {\r\n\t\tbackground: $pink;\r\n\t}\r\n\r\n\t&.--purple::after {\r\n\t\tbackground: $purple;\r\n\t}\r\n\r\n\t&.--deep-purple::after {\r\n\t\tbackground: $deep-purple;\r\n\t}\r\n\r\n\t&.--indigo::after {\r\n\t\tbackground: $indigo;\r\n\t}\r\n\r\n\t&.--blue::after {\r\n\t\tbackground: $blue;\r\n\t}\r\n\r\n\t&.--light-blue::after {\r\n\t\tbackground: $light-blue;\r\n\t}\r\n\r\n\t&.--cyan::after {\r\n\t\tbackground: $cyan;\r\n\t}\r\n\r\n\t&.--teal::after {\r\n\t\tbackground: $teal;\r\n\t}\r\n\r\n\t&.--green::after {\r\n\t\tbackground: $green;\r\n\t}\r\n\r\n\t&.--light-green::after {\r\n\t\tbackground: $light-green;\r\n\t}\r\n\r\n\t&.--lime::after {\r\n\t\tbackground: $lime;\r\n\t}\r\n\r\n\t&.--yellow::after {\r\n\t\tbackground: $yellow;\r\n\t}\r\n\r\n\t&.--amber::after {\r\n\t\tbackground: $amber;\r\n\t}\r\n\r\n\t&.--orange::after {\r\n\t\tbackground: $orange;\r\n\t}\r\n\r\n\t&.--deep-orange::after {\r\n\t\tbackground: $deep-orange;\r\n\t}\r\n\r\n\t&.--brown::after {\r\n\t\tbackground: $brown;\r\n\t}\r\n\r\n\t&.--blue-grey::after {\r\n\t\tbackground: $blue-grey;\r\n\t}\r\n\r\n\t&.--black::after {\r\n        background: $black;\r\n    }\r\n}\r\n\r\n.calendar_widget {\r\n\t&__actions {\r\n\t\t& > * + * {\r\n\t\t\tmargin-left: 8px !important;\r\n\t\t}\r\n\t}\r\n}\r\n",".check_in_actions {\r\n    display: flex;\r\n    align-items: center;\r\n    flex-flow: row nowrap;\r\n    justify-content: flex-end;\r\n\r\n    & > * + * {\r\n        margin-left: 8px;\r\n    }\r\n}\r\n","\r\n.chip_select {\r\n\tmargin-bottom: 8px;\r\n\r\n    &__textfield {\r\n        display: flex;\r\n        justify-content: flex-start;\r\n        flex-wrap: wrap;\r\n\t\talign-items: center;\r\n\t\theight: 48px;\r\n        padding: 4px;\r\n\r\n        & > * {\r\n            margin: 4px;\r\n        }\r\n    }\r\n\r\n\t&__actions {\r\n\t\tdisplay: flex;\r\n\t\tflex-flow: row nowrap;\r\n\t\talign-items: center;\r\n\t\tflex: 1;\r\n\t\tmargin: 0;\r\n\t\tpadding-left: 8px;\r\n\t\tmin-width: 320px;\r\n\r\n\t\t& > * + * {\r\n\t\t\tmargin-left: 4px !important;\r\n\t\t}\r\n\t}\r\n\r\n\t&__input {\r\n\t\tmin-width: 64px;\r\n\t\tmargin-right: 32px;\r\n\t\twidth: 100%;\r\n\t}\r\n\r\n\t&__divider {\r\n\t\theight: 24px !important;\r\n    }\r\n\t\r\n\t&__loading {\r\n\t\tpadding: 8px;\r\n\t}\r\n\r\n    &__popper {\r\n\t\tz-index: 2;\r\n\r\n\t\tul {\r\n\t\t\tmax-height: 240px;\r\n\t\t\toverflow-x: auto;\r\n\t\t}\r\n\r\n        .no_results {\r\n            padding: 4px 16px;\r\n\t\t}\r\n\t\t\r\n\t\t.chip_avatar {\r\n\t\t\twidth: 24px;\r\n\t\t\theight: 24px;\r\n\t\t\tfont-size: 12px;\r\n\t\t\tmargin-right: 8px;\r\n\t\t}\r\n\t}\r\n\r\n\t.chips_container {\r\n\t\tmargin-top: 16px;\r\n\t\tmargin-bottom: 0;\r\n\t}\r\n}\r\n",".content {\r\n\tbox-shadow: $elevation1;\r\n\tposition: relative;\r\n\tz-index: 1;\r\n\tpadding: 0 64px;\r\n\tflex: 1;\r\n\theight: 100vh;\r\n\toverflow: auto;\r\n\tbox-sizing: border-box;\r\n\ttransition: margin 0.2s;\r\n\r\n\t&.--content-inner {\r\n\t\tpadding: 32px 64px;\r\n\t\tbackground: #EFEFEF;\r\n\t}\r\n}",".date_widget {\r\n    padding: 8px 16px;\r\n    height: 248px;\r\n    box-sizing: content-box;\r\n    display: flex;\r\n    flex-flow: row nowrap;\r\n\r\n    & > * {\r\n        flex: 1;\r\n    }\r\n\r\n    & > div {\r\n        display: flex;\r\n        flex-flow: column nowrap;\r\n        justify-content: space-between;\r\n    }\r\n\r\n    .divider {\r\n        flex: unset;\r\n        margin-left: 16px;\r\n    }\r\n\r\n    &__absolute_range {\r\n        display: flex;\r\n        flex-flow: row nowrap;\r\n        align-items: center;\r\n\r\n        & > * + * {\r\n            margin-left: 8px;\r\n        }\r\n    }\r\n\r\n    &__predefined_ranges {\r\n        padding: 0;\r\n        height: 224px;\r\n        line-height: 24px;\r\n        display: flex;\r\n        flex-flow: column wrap;\r\n\r\n        li {\r\n            display: block;\r\n        }\r\n\r\n        .predefined_range {\r\n            font-weight: 500;\r\n            color: $primary;\r\n\r\n            &:hover {\r\n                cursor: pointer;\r\n            }\r\n        }\r\n    }\r\n\r\n    & > * + * {\r\n        margin-left: 16px;\r\n    }\r\n}\r\n",".empty-state-icon {\r\n\twidth: 100%;\r\n\tmargin: 40px 0 0;\r\n\ttext-align: center;\r\n\r\n\t&__image {\r\n\t\tdisplay: block;\r\n\t\tbackground-size: contain;\r\n\t\tbackground-repeat: no-repeat;\r\n\t\twidth: 120px;\r\n\t\theight: 120px;\r\n\t\tmargin: 0 auto 16px;\r\n\t}\r\n\r\n\th3 {\r\n\t\tfont-weight: 500;\r\n\t}\r\n}",".expansion-panel {\r\n    &__summary {\r\n        display: flex;\r\n        align-items: center;\r\n    }\r\n\r\n    &__heading {\r\n        flex-basis: 30%;\r\n    }\r\n\r\n    &__subheading {\r\n        color: #777;\r\n    }\r\n\r\n    &__details {\r\n        display: block !important; // Override material `display: flex`\r\n        max-height: 250px;\r\n        overflow: auto;\r\n    }\r\n\r\n    &__chips {\r\n        display: flex;\r\n        flex-flow: row wrap;\r\n        align-items: center;\r\n        justify-content: flex-start;\r\n        \r\n        & > * {\r\n            margin: 4px;\r\n        }\r\n    }\r\n}",".items_modal {\r\n\t&__content {\r\n\t\t.content-inner {\r\n\t\t\tmargin-left: 32px;\r\n\t\t}\r\n\t}\r\n\r\n\t&__content-loader {\r\n\t\twidth: 500px;\r\n\t\theight: 426px;\r\n\t\tposition: absolute;\r\n\t\ttop: 86px;\r\n\t\tleft: 0;\r\n\t\tpointer-events: none;\r\n\t}\r\n\r\n\t.items-group_header {\r\n\t\tfont-size: 14px;\r\n\t\tfont-weight: 500;\r\n\t\ttext-transform: uppercase;\r\n\t\tcolor: #777;\r\n\t}\r\n\r\n\t.items-group_list {\r\n\t\tmargin-bottom: 8px;\r\n\r\n\t\t&__item {\r\n\t\t\tborder-radius: 2px;\r\n\r\n\t\t\t&:hover {\r\n\t\t\t\tbackground: #EEE;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n",".modal-section {\r\n    &__button {\r\n        .button_text {\r\n            margin-left: 8px;\r\n            font-size: 16px;\r\n            font-weight: 500;\r\n            font-size: inherit;\r\n\r\n            & + * {\r\n                margin-left: 8px;\r\n            }\r\n        }\r\n    }\r\n\r\n    &__header {\r\n        display: flex;\r\n        flex-flow: row nowrap;\r\n        align-items: center;\r\n        margin-bottom: 8px;\r\n\r\n        & > * + * {\r\n            margin-left: 8px;\r\n        }\r\n    }\r\n\r\n    &__content {\r\n        margin: 0 0 16px 40px;\r\n    }\r\n}\r\n",".not-found {\r\n    .empty-state-icon {\r\n        margin-top: 50vh;\r\n        transform: translate(0, -100%);\r\n    }\r\n}",".notifications_modal {\r\n\t&__content {\r\n\t\t.content-inner {\r\n\t\t\tmargin-left: 32px;\r\n\t\t}\r\n\t}\r\n\r\n\t&__actions {\r\n\t\ttext-align: right;\r\n\t\tmargin-bottom: 8px;\r\n\r\n\t\t> * {\r\n\t\t\tmargin-right: 8px;\r\n\r\n\t\t\t&:last-child {\r\n\t\t\t\tmargin-right: 0;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t&__textfield {\r\n\t\tmargin: 16px 0;\r\n\t}\r\n\r\n\t.sidebar_modal__header {\r\n\t\tjustify-content: space-between;\r\n\r\n\t\t& > div:first-child {\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t}\r\n\t}\r\n\r\n\t.notification {\r\n\t\t.icon {\r\n\t\t\tmargin-right: 8px;\r\n\t\t}\r\n\r\n\t\t&__info {\r\n\t\t\twidth: 100%;\r\n\t\t\tdisplay: grid;\r\n\t\t\tfont-weight: 700;\r\n\r\n\t\t\t.header {\r\n\t\t\t\tmargin: 0;\r\n\t\t\t\twhite-space: nowrap;\r\n\t\t\t\toverflow: hidden;\r\n\t\t\t\ttext-overflow: ellipsis;\r\n\r\n\t\t\t\t.unread-badge {\r\n\t\t\t\t\tbackground: $primary;\r\n\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\twidth: 6px;\r\n\t\t\t\t\tborder-radius: 50%;\r\n\t\t\t\t\theight: 6px;\r\n\t\t\t\t\tmargin: 2px 8px 2px 0;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t.time {\r\n\t\t\t\tfont-weight: 400;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t&.--read {\r\n\t\t\t.notification__info {\r\n\t\t\t\tfont-weight: 500;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}","\r\n.power-scheduler__date {\r\n    display: flex;\r\n    flex-flow: row;\r\n    align-items: center;\r\n    margin: 8px 0;\r\n\r\n    & > * + * {\r\n        margin-left: 16px !important;\r\n    }\r\n}\r\n",".profile {\r\n\r\n\t.profile_title {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tline-height: 22px;\r\n\t\t\r\n\t\t.profile_avatar {\r\n\t\t\tmargin-right: 12px;\r\n\t\t}\r\n\r\n\t\t.name {\r\n\t\t\tmargin: 0;\r\n\t\t\tfont-weight: 500;\r\n\r\n\t\t\t.grade {\r\n\t\t\t\tfont-weight: 400;\r\n\t\t\t\tcolor: #888;\r\n\t\t\t\tmargin-left: 8px;\r\n\t\t\t\tborder-left: 1px solid #888;\r\n\t\t\t\tpadding-left: 8px;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t.cluster-list {\r\n\t\t\tfont-weight: 700;\r\n\t\t\tmargin: 0;\r\n\t\t\tcolor: #888;\r\n\t\t}\r\n\t}\r\n}\r\n",".reporting {\r\n    position: relative;\r\n\r\n    &__group {\r\n        display: flex;\r\n        flex-flow: row wrap;\r\n        margin: 16px 0;\r\n    }\r\n\r\n    &__variant {\r\n        max-width: 320px\r\n    }\r\n\r\n    .report {\r\n        &__header {\r\n            display: flex;\r\n            align-items: flex-end;\r\n            flex-flow: row wrap;\r\n\r\n            .header_info {\r\n                margin-bottom: 20px;\r\n            }\r\n\r\n            .header_actions {\r\n                display: flex;\r\n                flex-flow: row wrap;\r\n                align-items: initial;\r\n\r\n                & > * + * {\r\n                    margin-left: 16px;\r\n                }\r\n            }\r\n\r\n            & > * + * {\r\n                margin-left: 32px;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n.report_access {\r\n    display: flex;\r\n    flex-flow: row nowrap;\r\n    align-items: flex-start !important;\r\n\r\n    & > div {\r\n        flex-grow: 0;\r\n\r\n        & + div {\r\n            flex-grow: 1;\r\n            padding: 8px 0 0 8px;\r\n        }\r\n\r\n        h6 {\r\n            display: flex;\r\n            align-items: center;\r\n            font-weight: 500;\r\n\r\n            & > span + span {\r\n                margin-left: 8px\r\n            }\r\n        }\r\n    }\r\n}\r\n",".search_modal {\r\n\t&__content {\r\n\t\t.content-inner {\r\n\t\t\tmargin-left: 32px;\r\n\t\t}\r\n\t}\r\n\r\n\t.search-group_header {\r\n\t\tfont-size: 14px;\r\n\t\tfont-weight: 500;\r\n\t\ttext-transform: uppercase;\r\n\t\tcolor: #777;\r\n\t}\r\n\r\n\t.search-group_list {\r\n\t\tmargin-bottom: 8px;\r\n\r\n\t\t&__item {\r\n\t\t\tborder-radius: 2px;\r\n\r\n\t\t\t&:hover {\r\n\t\t\t\tbackground: #EEE;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}",".selectable-list {\r\n    &__header {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: space-between;\r\n        padding: 4px;\r\n        margin-bottom: 8px;\r\n        height: 48px;\r\n\r\n        .selectable-list__title,\r\n        .selectable-list__actions {\r\n            display: flex;\r\n            align-items: center;\r\n\r\n            & > * + * {\r\n                margin-left: 8px;\r\n            }\r\n        }\r\n    }\r\n\r\n    &__list {\r\n        padding: 0 !important;\r\n    }\r\n}\r\n",".setting {\r\n    display: flex;\r\n}\r\n",".sidebar {\r\n\theight: 100vh;\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex-shrink: 1;\r\n\twidth: 80px;\r\n\tbackground: $primary-white;\r\n\ttransition-property: width;\r\n\ttransition-duration: 0.3s;\r\n\ttransition-timing-function: cubic-bezier(0.2, 0, 0, 1);\r\n\r\n\t&__nav {\r\n\t\twidth: 64px;\r\n\t\theight: 100vh;\r\n\t\tposition: relative;\r\n\t\tz-index: 3;\r\n\t\tbox-shadow: inset -6px 0 6px -6px rgba(0, 0, 0, 0.16), inset -6px 0 6px -6px rgba(0, 0, 0, 0.23);\r\n\t\tmargin-right: 16px;\r\n\t\tpadding: 16px 8px;\r\n\t\tbox-sizing: border-box;\r\n\t\tbackground: $primary;\r\n\t\tcolor: $primary-white;\r\n\t\tdisplay: flex;\r\n\t\tflex-flow: column;\r\n\t\tjustify-content: space-between;\r\n\r\n\t\t.nav_account {\r\n\t\t\tpadding: 8px;\r\n\t\t}\r\n\r\n\t\t& > div > * {\r\n\t\t\tcolor: inherit;\r\n\t\t}\r\n\r\n\t\t.nav_button {\r\n\t\t\tcolor: inherit;\r\n\r\n\t\t\t.nav_avatar {\r\n\t\t\t\twidth: 32px;\r\n\t\t\t\theight: 32px;\r\n\t\t\t\tfont-size: 14px;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t&__menu {\r\n\t\tposition: absolute;\r\n\t\tleft: 64px;\r\n\t\ttop: 0;\r\n\t\tz-index: 2;\r\n\t\theight: 100vh;\r\n\t\twidth: 0;\r\n\t\tflex-shrink: 0;\r\n\t\tbackground: $primary-white;\r\n\t\tpadding: 0;\r\n\t\tmargin: 0;\r\n\t\tbox-sizing: content-box;\r\n\t\tdisplay: inline-block;\r\n\t\tbox-shadow: none;\r\n\t\toverflow-y: auto;\r\n\t\toverflow-x: hidden;\r\n\t\ttransition-duration: 0.3s;\r\n\t\ttransition-timing-function: cubic-bezier(0.2, 0, 0, 1);\r\n\t\ttransition-property: width, box-shadow;\r\n\r\n\t\t.menu_content {\r\n\t\t\tposition: relative;\r\n\t\t\twidth: 260px;\r\n\t\t}\r\n\r\n\t\t.menu_header {\r\n\t\t\theight: 80px;\r\n\t\t\tmargin: 0 16px 8px;\r\n\t\t\tpadding: 16px;\r\n\t\t\tbox-sizing: border-box;\r\n\t\t\tborder-bottom: 1px solid rgba(0,0,0,0.12);\r\n\t\t\tdisplay: flex;\r\n\t\t\tflex-flow: row nowrap;\r\n\t\t\talign-items: center;\r\n\r\n\t\t\t&__logo {\r\n\t\t\t\twidth: 48px;\r\n\t\t\t\tmax-height: 48px;\r\n\t\t\t\tmargin-right: 8px;\r\n\t\t\t\tbackground: $primary-semi-light;\r\n\t\t\t\tbackground-repeat: no-repeat;\r\n\t\t\t\tbackground-size: cover;\r\n\t\t\t\tborder-radius: 2px;\r\n\t\t\t\toverflow: hidden;\r\n\r\n\t\t\t\t&.--logo {\r\n\t\t\t\t\tbackground: unset;\r\n\t\t\t\t}\r\n\r\n\t\t\t\timg {\r\n\t\t\t\t\twidth: 100%;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\th4 {\r\n\t\t\t\tmargin: 0;\r\n\t\t\t\tfont-weight: 500;\r\n\t\t\t\tletter-spacing: normal;\r\n\t\t\t\ttext-transform: uppercase;\r\n\t\t\t\tfont-size: 14px;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t.menu_list {\r\n\t\t\tpadding: 0 16px;\r\n\r\n\t\t\t&__link {\r\n\t\t\t\tcolor: inherit;\r\n\r\n\t\t\t\t.list_item {\r\n\t\t\t\t\tdisplay: flex;\r\n\t\t\t\t\talign-items: center;\r\n\t\t\t\t\tpadding: 8px 16px;\r\n\t\t\t\t\tmargin: 4px 0;\r\n\t\t\t\t\tmin-width: 128px;\r\n\t\t\t\t\tmax-width: 224px;\r\n\t\t\t\t\theight: 48px;\r\n\t\t\t\t\tbox-sizing: border-box;\r\n\t\t\t\t\tline-height: 18px !important;\r\n\t\t\t\t\tborder-radius: 2px;\r\n\t\t\t\t\tfont-weight: 500;\r\n\t\t\t\t\tcursor: pointer;\r\n\t\t\t\t\tuser-select: none;\r\n\t\t\t\t\ttransition: color 0.2s;\r\n\r\n\t\t\t\t\t&:hover {\r\n\t\t\t\t\t\tbackground: $primary-light\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\t&__icon {\r\n\t\t\t\t\t\tcolor: rgba(0, 0, 0, 0.54);\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\r\n\t\t\t\t&.--selected .list_item {\r\n\t\t\t\t\tcolor: $primary;\r\n\t\t\t\t\tbackground: $primary-light;\r\n\r\n\t\t\t\t\t&__icon {\r\n\t\t\t\t\t\tcolor: $primary;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.nav_account_details {\r\n\tpadding: 8px 16px;\r\n\r\n\th3 {\r\n\t\tmargin: 0;\r\n\t\tline-height: 24px;\r\n\t\tdisplay: flex;\r\n\t\tfont-weight: 500;\r\n\t}\r\n\r\n\th5 {\r\n\t\tmargin: 0;\r\n\t\tfont-weight: 500;\r\n\t\tcolor: #888;\r\n\t}\r\n}\r\n",".sidebar_modal {\r\n\twidth: 500px;\r\n\r\n\t&__header {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tpadding: 16px 32px 8px 8px;\r\n\t\t\r\n\t\t.button_back {\r\n\t\t\tmargin-right: 8px;\r\n\t\t}\r\n\r\n\t\th3 {\r\n\t\t\tmargin: 0;\r\n\t\t}\r\n\t}\r\n\r\n\t&__content {\r\n\t\tpadding: 8px 32px 16px 32px;\r\n\t}\r\n}",".splash {\r\n\tposition: relative;\r\n\r\n\t&__inner {\r\n\t\tposition: fixed;\r\n\t\tbackground: #F1F1F1;\r\n\t\tz-index: 110;\r\n\t\twidth: 100vw;\r\n\t\theight: 100vh;\r\n\t}\r\n\t\t\r\n\t&__content {\r\n\t\tposition: fixed;\r\n\t\ttop: 50%;\r\n\t\tleft: 50%;\r\n\t\ttransform: translate(-50%, -50%);\r\n        text-align: center;\r\n        \r\n        & > * {\r\n            position: absolute;\r\n            top: 50%;\r\n            left: 50%;\r\n            transform: translate(-50%, -50%);\r\n            z-index: 2;\r\n        }\r\n    }\r\n\r\n    &__image_logo {\r\n        display: block;\r\n        width: 64px;\r\n        height: 64px;\r\n        margin: 16px;\r\n    }\r\n\r\n    .loading_badge {\r\n        width: 150px;\r\n        height: 150px;\r\n        z-index: 1 !important;\r\n    \r\n        .left {\r\n            opacity: 0.5;\r\n        }\r\n    \r\n        .right {\r\n            opacity: 1;\r\n        }\r\n    \r\n        svg {\r\n            width: 100%;\r\n            height: 100%;\r\n        }\r\n    }    \r\n}\r\n",".starred_modal {\r\n\t&__content {\r\n\t\t.content-inner {\r\n\t\t\tmargin-left: 32px;\r\n\r\n\t\t\t.items-group_list {\r\n\t\t\t\t&__item {\r\n\t\t\t\t\t& + .star {\r\n\t\t\t\t\t\topacity: 0;\r\n\t\t\t\t\t\tvisibility: hidden;\r\n\r\n\t\t\t\t\t\t&:hover {\r\n\t\t\t\t\t\t\topacity: 1;\r\n\t\t\t\t\t\t\tvisibility: visible;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\t&:hover + .star {\r\n\t\t\t\t\t\t\topacity: 1;\r\n\t\t\t\t\t\t\tvisibility: visible;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.--starred {\r\n\tcolor: $star-color !important;\r\n}\r\n",".enhanced-table {\r\n    margin: 16px 0;\r\n\r\n    .empty-state {\r\n        padding: 64px;\r\n        border-radius: 4px;\r\n        border: 2px dotted #222;\r\n    }\r\n\r\n    &__link {\r\n        cursor: pointer;\r\n    }\r\n\r\n    &__toolbar {\r\n        width: 100%;\r\n        display: flex;\r\n        flex-flow: row;\r\n        align-items: center;\r\n        justify-content: space-between;\r\n\r\n        h3 {\r\n            margin: 0;\r\n\r\n            &.num-selected {\r\n                font-weight: 400;\r\n            }\r\n        }\r\n\r\n        .enhanced-table__tools {\r\n            display: flex;\r\n            flex-flow: row;\r\n            align-items: center;\r\n        }\r\n    }\r\n\r\n    .enhanced-table__filters {\r\n        width: 450px;\r\n        position: absolute;\r\n        top: 8px;\r\n        right: 8px;\r\n        padding: 16px;\r\n        background: #FFF;\r\n        border-radius: 2px;\r\n        z-index: 100;\r\n\r\n        .placeholder {\r\n            margin: 16px;\r\n            text-align: center;\r\n        }\r\n\r\n        .filters-header {\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: space-between;\r\n            box-sizing: border-box;\r\n\r\n            h3 {\r\n                margin: 0;\r\n            }\r\n\r\n            .filter-actions {\r\n                display: flex;\r\n                flex-flow: row;\r\n\r\n                .filter-action {\r\n                    margin-left: 8px;\r\n\r\n                    &:last-child {\r\n                        margin-left: 0;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n        .filters-actions {\r\n            display: flex;\r\n            flex-flow: row nowrap;\r\n            align-items: flex-end;\r\n\r\n            & > * + * {\r\n                margin-left: 8px;\r\n            }\r\n        }\r\n\r\n        .filter-rule {\r\n            display: flex;\r\n            align-items: baseline;\r\n            margin-bottom: 8px;\r\n\r\n            & > * {\r\n                margin-left: 8px;\r\n\r\n                &:first-child {\r\n                    margin-left: 0;\r\n                }\r\n\r\n                &.--enum {\r\n                    flex-grow: 1;\r\n                }\r\n            }\r\n\r\n            &:last-child {\r\n                margin-bottom: 16px;\r\n            } \r\n        }\r\n\r\n        .filter-rule_placeholder {\r\n            display: flex;\r\n            flex-flow: row nowrap;\r\n            justify-content: flex-end;\r\n        }\r\n    }\r\n}\r\n",".topics_dialog {\r\n    &__new {\r\n        .topic_name {\r\n            display: flex;\r\n            flex-flow: row nowrap;\r\n            align-items: center;\r\n            margin: 16px 0 8px;\r\n\r\n            .color_swatch {\r\n                margin-right: 8px;\r\n                border-radius: 50%;\r\n                \r\n                & * {\r\n                    color: rgba(255,255,255,0.87);\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n.colors_dialog {\r\n    &__colors {\r\n        display: grid;\r\n        grid-template-columns: 1fr 1fr;\r\n        grid-gap: 4px;\r\n    }\r\n\r\n    .color {\r\n        display: flex;\r\n        align-items: center;\r\n        padding: 4px;\r\n        cursor: pointer;\r\n\r\n        &.--selected {\r\n            outline: 2px solid $primary;\r\n        }\r\n\r\n        &__name {\r\n            font-weight: 400;\r\n            margin: 0;\r\n        }\r\n\r\n        &__swatch {\r\n            width: 24px;\r\n            height: 24px;\r\n            border-radius: 50%;\r\n            margin-right: 8px;\r\n        }\r\n    }\r\n}\r\n",".top-nav {\r\n\tpadding: 16px;\r\n\tborder-bottom: 1px solid #EEE;\r\n\tmargin-bottom: 16px;\r\n\r\n\t&.--tabs {\r\n\t\tdisplay: grid;\r\n\t\tpadding: 0;\r\n\r\n\t\t.top-nav__inner {\r\n\t\t\tpadding: 16px 16px 8px 16px;\r\n\t\t}\r\n\t}\r\n\r\n\t&__inner {\r\n\t\theight: 48px;\r\n\t\tline-height: 48px;\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tjustify-content: space-between;\r\n\r\n\t\tul {\r\n\t\t\tdisplay: flex;\r\n\t\t\tli {\r\n\t\t\t\tmargin-left: 16px;\r\n\r\n\t\t\t\t&:first-child {\r\n\t\t\t\t\tmargin-left: 0;\r\n\t\t\t\t}\r\n\t\t\t}\t\r\n\t\t}\r\n\r\n\t\th3 {\r\n\t\t\tmargin: 0;\r\n\t\t}\r\n\t}\r\n\r\n\t&__actions {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tflex-flow: row nowrap;\r\n\r\n\t\t& > div + div {\r\n\t\t\tmargin-left: 8px;\r\n\t\t}\r\n\t}\r\n}"]}]);



/***/ }),

/***/ "N49g":
/*!***********************************************!*\
  !*** ./resources/src/actions/topicActions.ts ***!
  \***********************************************/
/*! exports provided: fetchTopics, createTopic, deleteTopic, createTopicSchedule, deleteTopicSchedule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTopics", function() { return fetchTopics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTopic", function() { return createTopic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTopic", function() { return deleteTopic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTopicSchedule", function() { return createTopicSchedule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTopicSchedule", function() { return deleteTopicSchedule; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchTopics = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/topics')
            .then(function (res) {
            var topics = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_TOPICS"],
                payload: topics
            });
        });
    };
};
var createTopic = function (topic) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/topics', topic)
            .then(function (res) {
            var newTopic = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["NEW_TOPIC"],
                payload: newTopic
            });
        });
    };
};
var deleteTopic = function (topicID) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/api/topics/" + topicID)
            .then(function (res) {
            var deletedTopic = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["DELETE_TOPIC"],
                payload: deletedTopic
            });
        });
    };
};
var createTopicSchedule = function (topicSchedule) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/topics/schedule', topicSchedule)
            .then(function (res) {
            var newTopicSchedule = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["NEW_TOPIC_SCHEDULE"],
                payload: newTopicSchedule
            });
        });
    };
};
var deleteTopicSchedule = function (topicScheduleID) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/api/topics/schedule/" + topicScheduleID)
            .then(function (res) {
            var topicSchedule = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["DELETE_TOPIC_SCHEDULE"],
                payload: topicSchedule
            });
        });
    };
};


/***/ }),

/***/ "NmQr":
/*!********************************************************!*\
  !*** ./resources/src/components/Calendar/Calendar.tsx ***!
  \********************************************************/
/*! exports provided: Calendar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar; });
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @date-io/date-fns */ "mPma");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/pickers */ "K1a+");
/* harmony import */ var _CalendarBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CalendarBlock */ "k3uG");
/* harmony import */ var _CalendarDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CalendarDialog */ "MAQM");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};








var emptyIBlockDetails = {
    block_id: 0,
    date: '',
    start: '',
    end: '',
    label: '',
    pending: true,
    flex: false,
    data: {}
};
var Calendar = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(false), datePickerOpen = _a[0], setDatePickerOpen = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(new Date()), datePickerRange = _b[0], setDatePickerRange = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(false), dialogOpen = _c[0], setDialogOpen = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(emptyIBlockDetails), blockDetails = _d[0], setBlockDetails = _d[1];
    var CalendarLoader = function () { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { style: { width: 216, height: 64 } },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_3__["default"], { width: 216, height: 64 },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 14, rx: 4, ry: 4, width: 120, height: 24 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 136, y: 8, rx: 36, ry: 36, width: 36, height: 36 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 180, y: 8, rx: 36, ry: 36, width: 36, height: 36 }))),
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { style: { width: '100%' } },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_3__["default"], { width: 864, height: 384 },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 62, y: 0, ry: 4, rx: 4, width: 36, height: 16 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 62, y: 28, ry: 36, rx: 48, width: 36, height: 36 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 80, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 184, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 0, y: 288, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 238, y: 0, ry: 4, rx: 4, width: 36, height: 16 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 238, y: 28, ry: 36, rx: 48, width: 36, height: 36 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 176, y: 80, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 176, y: 184, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 414, y: 0, ry: 4, rx: 4, width: 36, height: 16 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 414, y: 28, ry: 36, rx: 48, width: 36, height: 36 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 352, y: 80, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 352, y: 184, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 352, y: 288, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 590, y: 0, ry: 4, rx: 4, width: 36, height: 16 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 590, y: 28, ry: 36, rx: 48, width: 36, height: 36 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 528, y: 80, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 766, y: 0, ry: 4, rx: 4, width: 36, height: 16 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 766, y: 28, ry: 36, rx: 48, width: 36, height: 36 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 704, y: 80, ry: 4, rx: 4, width: 160, height: 96 }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("rect", { x: 704, y: 184, ry: 4, rx: 4, width: 160, height: 96 }))))); };
    var previousButton = (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { disabled: !props.hasPrevious, onClick: function () { return props.onPrevious(); } },
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "chevron_left")));
    var nextButton = (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { disabled: !props.hasNext, onClick: function () { return props.onNext(); } },
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "chevron_right")));
    var handleBlockClick = function (details) {
        setBlockDetails(details);
        props.onDialogOpen();
        setDialogOpen(true);
        if (props.onBlockClick) {
            props.onBlockClick(details);
        }
    };
    var handleDialogClose = function () {
        setDialogOpen(false);
        props.onDialogClose();
    };
    var handleDatePickerSelect = function (date) {
        setDatePickerRange(date);
        props.onDatePickerChange(date);
    };
    return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar_container' }, props.loading || !(props.calendar) ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CalendarLoader, null)) : (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_CalendarDialog__WEBPACK_IMPORTED_MODULE_7__["CalendarDialog"], { blockDetails: blockDetails, open: dialogOpen && props.dialogOpen !== false, onClose: handleDialogClose, calendarDialogGroups: props.calendarDialogGroups }),
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", { className: 'calendar_header' },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_5__["MuiPickersUtilsProvider"], { utils: _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__["default"] },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_5__["DatePicker"], { variant: 'dialog', open: datePickerOpen, onClose: function () { return setDatePickerOpen(false); }, value: datePickerRange, onChange: handleDatePickerSelect, minDate: props.minDate, maxDate: props.maxDate, TextFieldComponent: function () { return null; } })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { onClick: function () { return setDatePickerOpen(true); } }, props.rangeLabel || 'Select Date')),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, props.hasPrevious ? previousButton : (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Back', placement: 'top' }, previousButton))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, props.hasNext ? nextButton : (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Next', placement: 'top' }, nextButton))),
            props.onRefresh && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Refresh', placement: 'top' },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { onClick: function () { return props.onRefresh(); } },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "refresh")))))),
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar' },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar_row' }, props.calendar.map(function (calendarDay) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('label', { '--today': calendarDay.date.is_today }), key: calendarDay.date.full_date },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h5", { className: 'day' }, calendarDay.date.day),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", { className: 'date' }, calendarDay.date.date))); })),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar_row' }, props.calendar.map(function (calendarDay, dayIndex) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar_events', key: dayIndex }, calendarDay.events.map(function (event, eventIndex) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'event', key: eventIndex }, event.name || 'event')); }))); })),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar_row' }, props.calendar.map(function (calendarDay, dayIndex) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: 'calendar_blocks', key: dayIndex }, calendarDay.blocks.map(function (block, blockIndex) {
                return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_CalendarBlock__WEBPACK_IMPORTED_MODULE_6__["CalendarBlock"], __assign({ key: blockIndex }, block, { onClick: function () { return handleBlockClick(block.details); } }));
            }))); })))))));
};


/***/ }),

/***/ "NniU":
/*!************************************************!*\
  !*** ./resources/src/reducers/topicReducer.ts ***!
  \************************************************/
/*! exports provided: topicReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "topicReducer", function() { return topicReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: [],
    item: {}
};
var topicReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_TOPICS"]:
            return __assign({}, state, { items: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["NEW_TOPIC"]:
            return __assign({}, state, { item: action.payload, items: state.items.concat([action.payload]) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["DELETE_TOPIC"]:
            return __assign({}, state, { items: state.items.filter(function (item) { return (item.id !== action.payload.id); }) });
        default:
            return state;
    }
};


/***/ }),

/***/ "NqlT":
/*!**************************************************!*\
  !*** ./resources/src/reducers/checkinReducer.ts ***!
  \**************************************************/
/*! exports provided: checkinReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkinReducer", function() { return checkinReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    status: {
        date: { day: '', full_date: '', date: 0, is_today: false },
        blocks: [],
        next: '',
        previous: '',
        today: ''
    },
    response: null
};
var checkinReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_CHECKIN_STATUS"]:
            return __assign({}, state, { status: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["CHECK_IN"]:
            return __assign({}, state, { response: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "O7Nk":
/*!**********************************************!*\
  !*** ./resources/src/actions/authActions.ts ***!
  \**********************************************/
/*! exports provided: getCurrentUser, checkUsername, login, logout, resetPasswords, invalidatePasswords, disableUsers, reenableUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUser", function() { return getCurrentUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkUsername", function() { return checkUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPasswords", function() { return resetPasswords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidatePasswords", function() { return invalidatePasswords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableUsers", function() { return disableUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reenableUsers", function() { return reenableUsers; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api */ "B/6j");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "xkie");



var getCurrentUser = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/user')
            .then(function (res) {
            var user = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_CURRENT_USER"],
                payload: user
            });
        });
    };
};
var checkUsername = function (username) {
    /*
    const config = {
        headers: [
            { 'Content-Type': 'application/jon' },
            { 'Accept': 'application/jon' },
        ]
    }
    */
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/check-user', { username: username });
    };
};
var login = function (credentials) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/login', credentials)
            .then(function (res) {
            var token = res.data.access_token;
            Object(_utils_api__WEBPACK_IMPORTED_MODULE_1__["setAuthorizationToken"])(token);
            getCurrentUser();
        });
    };
};
var logout = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/logout');
    };
};
var resetPasswords = function (userIDs) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/users/reset-passwords', { user_ids: userIDs });
};
var invalidatePasswords = function (userIDs) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/users/invalidate-passwords', { user_ids: userIDs });
};
var disableUsers = function (userIDs) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/users/disable-users', { user_ids: userIDs });
};
var reenableUsers = function (userIDs) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/users/reenable-users', { user_ids: userIDs });
};


/***/ }),

/***/ "Oh+x":
/*!*************************************!*\
  !*** ./resources/src/utils/http.ts ***!
  \*************************************/
/*! exports provided: verifyPassword, changePassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyPassword", function() { return verifyPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePassword", function() { return changePassword; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Verify whether a user's password is correct by checking with the server.
 * @param password The password.
 * @return `Promise<Void>` resulting from `axios` request.
 */
var verifyPassword = function (password) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/verify-user', { password: password });
};
/**
 * Changes the authenticated user's password
 * @param oldPassword The user's old password, which is verified by the server
 * @param newPassword The user's new password
 */
var changePassword = function (oldPassword, newPassword) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/change-password', {
        password: oldPassword,
        new_password: newPassword,
    });
};


/***/ }),

/***/ "PF30":
/*!************************************************!*\
  !*** ./resources/src/actions/reportActions.ts ***!
  \************************************************/
/*! exports provided: fetchReports, createReport, updateReport, deleteReport, fetchReportByID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReports", function() { return fetchReports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReport", function() { return createReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateReport", function() { return updateReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteReport", function() { return deleteReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReportByID", function() { return fetchReportByID; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "xkie");


var fetchReports = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/reports/self')
            .then(function (res) { return dispatch({
            type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["FETCH_REPORTS"],
            payload: res.data
        }); });
    };
};
var createReport = function (report) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/reports', report)
            .then(function (res) { return dispatch({
            type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["CREATE_REPORT"],
            payload: res.data
        }); });
    };
};
var updateReport = function (report) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.put('/api/reports', report)
            .then(function (res) { return dispatch({
            type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_REPORT"],
            payload: res.data
        }); });
    };
};
var deleteReport = function (reportID) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/api/reports/" + reportID)
            .then(function (res) { return dispatch({
            type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["DELETE_REPORT"],
            payload: res.data
        }); });
    };
};
var fetchReportByID = function (reportID) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/reports/" + reportID);
};


/***/ }),

/***/ "PqiN":
/*!***********************************************************!*\
  !*** ./resources/src/components/CheckIn/ErrorsDialog.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/storage */ "k83H");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ErrorsDialog = /** @class */ (function (_super) {
    __extends(ErrorsDialog, _super);
    function ErrorsDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClearErrors = function () {
            _this.props.onClose();
            var checkInErrors = localStorage.getItem(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["CHECK_IN_ERRORS"]);
            _this.props.queueSnackbar({
                message: 'Cleared check-in errors.',
                buttons: [{ value: 'Undo', callback: function () { return localStorage.setItem(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["CHECK_IN_ERRORS"], checkInErrors); } }]
            });
            localStorage.removeItem(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["CHECK_IN_ERRORS"]);
        };
        return _this;
    }
    ErrorsDialog.prototype.render = function () {
        var _this = this;
        var checkInErrors = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["makeArray"])(Object(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["getObjectFromLocalStorage"])(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["CHECK_IN_ERRORS"]));
        var hasErrors = checkInErrors && checkInErrors.length > 0;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: this.props.open },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], null, "Check-in Errors"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
                hasErrors ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, "The following check-in entries could not be resolved. This may be because the entry was mistyped, or the entry is not associated with an existing student account."),
                    checkInErrors.map(function (checkInError) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { key: checkInError.timestamp_string },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { className: 'check-in_error_header' }, checkInError.timestamp_string),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: 'check-in_error' }, checkInError.errors.join(', '))))); }))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, "No errors yet. Student numbers you enter but don't resolve will appear here."))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                    hasErrors && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', color: 'primary', onClick: function () { return _this.handleClearErrors(); } }, "Clear All")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return _this.props.onClose(); } }, "Close")))));
    };
    return ErrorsDialog;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapDispatchToProps = { queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__["queueSnackbar"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(ErrorsDialog));


/***/ }),

/***/ "T0Q2":
/*!***********************************************************!*\
  !*** ./resources/src/components/Reporting/DateWidget.tsx ***!
  \***********************************************************/
/*! exports provided: DateWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateWidget", function() { return DateWidget; });
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @date-io/date-fns */ "mPma");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/pickers */ "K1a+");
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/date */ "3Uil");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var DateWidget = /** @class */ (function (_super) {
    __extends(DateWidget, _super);
    function DateWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            widgetRef: null
        };
        _this.handleOpen = function (event) {
            _this.setState({ widgetRef: event.currentTarget });
        };
        _this.handleClose = function () {
            _this.setState({ widgetRef: null });
        };
        _this.handleDatePickerSelect = function (point, date) {
            var newDateRange = Object(_utils_date__WEBPACK_IMPORTED_MODULE_4__["normalizeDateRange"])(_this.props.dateRange);
            newDateRange[point] = date;
            if (newDateRange.start > newDateRange.end) {
                newDateRange = __assign({}, newDateRange, { start: newDateRange.end, end: newDateRange.start });
            }
            _this.handleChangeDateRange(newDateRange);
        };
        _this.handlePredefinedDateSelect = function (predefinedDateRange) {
            _this.handleChangeDateRange({
                type: 'predefined',
                range: predefinedDateRange
            });
        };
        _this.handleChangeDateRange = function (dateRange) {
            _this.props.onUpdateReport({ date_range: dateRange });
        };
        _this.handleChangeSegment = function (event) {
            var segment = event.target.value;
            _this.props.onUpdateReport({ segment: segment });
        };
        return _this;
    }
    DateWidget.prototype.render = function () {
        var _this = this;
        var open = Boolean(this.state.widgetRef);
        var normalizedDateRange = Object(_utils_date__WEBPACK_IMPORTED_MODULE_4__["normalizeDateRange"])(this.props.dateRange);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormControl"], { variant: 'outlined' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Select"], { input: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["OutlinedInput"], { labelWidth: 0 }), renderValue: function (value) { return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, value); }, value: Object(_utils_date__WEBPACK_IMPORTED_MODULE_4__["dateRangeToString"])(this.props.dateRange), onClose: this.handleClose, MenuProps: {
                        open: open,
                        anchorEl: this.state.widgetRef,
                        onClose: this.handleClose,
                        getContentAnchorEl: null,
                        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                        transformOrigin: { vertical: 'top', horizontal: 'left' }
                    }, onClick: this.handleOpen, disabled: this.props.disabled },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ClickAwayListener"], { onClickAway: function () { return _this.handleClose(); } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'date_widget' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'subtitle1' }, "Absolute Date Range"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'date_widget__absolute_range' },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_3__["MuiPickersUtilsProvider"], { utils: _date_io_date_fns__WEBPACK_IMPORTED_MODULE_0__["default"] },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_3__["DatePicker"], { variant: 'inline', label: 'Start date', value: normalizedDateRange.start, onChange: function (date) { return _this.handleDatePickerSelect('start', date); } })),
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "\u2192"),
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_3__["DatePicker"], { variant: 'inline', label: 'End date', value: normalizedDateRange.end, onChange: function (date) { return _this.handleDatePickerSelect('end', date); } }))))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'subtitle1' }, "Date Range Segment"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { value: this.props.segment, onChange: this.handleChangeSegment, select: true, variant: 'standard', disabled: this.props.disabled, fullWidth: true }, Object.keys(_utils_date__WEBPACK_IMPORTED_MODULE_4__["DATE_SEGMENT_LABELS"]).map(function (segment) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { value: segment, key: segment }, _utils_date__WEBPACK_IMPORTED_MODULE_4__["DATE_SEGMENT_LABELS"][segment][1])); })))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Divider"], { orientation: 'vertical', className: 'divider' }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'subtitle1' }, "Predefiend Date Range"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ol", { className: 'date_widget__predefined_ranges' }, Object.keys(_utils_date__WEBPACK_IMPORTED_MODULE_4__["PREDEFINED_LABELS"]).map(function (predefinedDateRange) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: 'predefined_range', onClick: function () { return _this.handlePredefinedDateSelect(predefinedDateRange); }, key: predefinedDateRange },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, _utils_date__WEBPACK_IMPORTED_MODULE_4__["PREDEFINED_LABELS"][predefinedDateRange]))); }))))))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormHelperText"], null, this.props.dateRange.type === 'absolute' ? '' : (Object(_utils_date__WEBPACK_IMPORTED_MODULE_4__["dateRangeToString"])(Object(_utils_date__WEBPACK_IMPORTED_MODULE_4__["normalizeDateRange"])(this.props.dateRange))))));
    };
    return DateWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "TQGL":
/*!********************************!*\
  !*** ./resources/src/theme.ts ***!
  \********************************/
/*! exports provided: theme, COLORS, getRandomColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomColor", function() { return getRandomColor; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "TTf+");

var primary = {
    main: '#034670',
    light: '#E3E9EE'
};
var secondary = {
    main: '#43E0FF'
};
var theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
    palette: {
        primary: primary,
        secondary: secondary
    }
});
var COLORS = [
    { name: 'red', label: 'Red' },
    { name: 'pink', label: 'Pink' },
    { name: 'purple', label: 'Purple' },
    { name: 'deep-purple', label: 'Deep Purple' },
    { name: 'indigo', label: 'Indigo' },
    { name: 'blue', label: 'Blue' },
    { name: 'light-blue', label: 'Light Blue' },
    { name: 'cyan', label: 'Cyan' },
    { name: 'teal', label: 'Teal' },
    { name: 'green', label: 'Green' },
    { name: 'light-green', label: 'Light Green' },
    { name: 'lime', label: 'Lime' },
    { name: 'yellow', label: 'Yellow' },
    { name: 'amber', label: 'Amber' },
    { name: 'orange', label: 'Orange' },
    { name: 'deep-orange', label: 'Deep Orange' },
    { name: 'brown', label: 'Brown' },
    { name: 'blue-grey', label: 'Blue Grey' }
];
/**
 * Returns a random Color.
 * @return The a random Color.
 */
var getRandomColor = function () {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
};


/***/ }),

/***/ "Ty2E":
/*!***********************************************!*\
  !*** ./resources/src/assets/styles/main.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-2!./main.scss */ "N0Au");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "U/No":
/*!*********************************************************!*\
  !*** ./resources/src/components/Views/StaffProfile.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_staffProfileActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/staffProfileActions */ "b2WD");
/* harmony import */ var _actions_staffScheduleActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/staffScheduleActions */ "u7VM");
/* harmony import */ var _actions_starActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/starActions */ "BHus");
/* harmony import */ var _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/studentScheduleActions */ "60lH");
/* harmony import */ var _actions_topicActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../actions/topicActions */ "N49g");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Calendar_Calendar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Calendar/Calendar */ "NmQr");
/* harmony import */ var _Calendar_CancelAppointment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Calendar/CancelAppointment */ "gWuD");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _Modals_CapacityWidget__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Modals/CapacityWidget */ "VeNm");
/* harmony import */ var _Modals_ChangePasswordWidget__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Modals/ChangePasswordWidget */ "X14/");
/* harmony import */ var _Modals_TopicsDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Modals/TopicsDialog */ "I5WJ");
/* harmony import */ var _StarButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../StarButton */ "elSr");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../TopNav */ "qcP7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




















var StaffProfile = /** @class */ (function (_super) {
    __extends(StaffProfile, _super);
    function StaffProfile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingProfile: false,
            loadingSchedule: false,
            loadingSetTopic: false,
            editDialogOpen: false,
            calendarDialogOpen: false,
            staffID: 0,
            menuRef: null,
            blockDetails: null,
            cancelAppointmentDialogOpen: false,
            cancelAppointmentDialogItem: null,
            cancelAppointment: null,
            topicsDialogOpen: false,
            topcisDialogMode: 'edit',
            onTopicSelect: function () { return null; }
        };
        _this.toggleStarred = function (isStarred) {
            var starredItem = {
                item_id: _this.props.staff.id,
                item_type: 'staff'
            };
            if (isStarred) {
                _this.props.unstarItem(starredItem);
            }
            else {
                _this.props.starItem(starredItem);
            }
        };
        _this.handleMenuOpen = function (event) {
            _this.setState({ menuRef: event.currentTarget });
        };
        _this.handleMenuClose = function () {
            _this.setState({ menuRef: null });
        };
        _this.handleOpenEditDialog = function () {
            _this.handleMenuClose();
            _this.setState({ editDialogOpen: true });
        };
        _this.handleCloseEditDialog = function () {
            _this.setState({ editDialogOpen: false });
        };
        _this.handleCancelAppointmentDialogOpen = function (appointment) {
            _this.setState({
                cancelAppointmentDialogOpen: true,
                cancelAppointment: appointment
            });
        };
        _this.handleCancelAppointmentDialogClose = function () {
            _this.setState({
                cancelAppointmentDialogOpen: false,
                calendarDialogOpen: false
            });
        };
        _this.handleCancelAppointment = function (appointment) {
            var appointmentID = appointment.id;
            return Object(_actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_9__["deleteAppointment"])(appointmentID)
                .then(function (res) {
                return _this.props.fetchStaffSchedule(_this.state.staffID, _this.getURLDateTime());
            });
        };
        _this.getURLDateTime = function () {
            var searchParams = new URLSearchParams(_this.props.location.search);
            return searchParams.get('date');
        };
        _this.setURLDateTime = function (dateTime) {
            _this.props.history.push({
                pathname: _this.props.location.pathname,
                search: "?date=" + dateTime
            });
        };
        _this.fetchSchedule = function (dateTime) {
            _this.setState({ loadingSchedule: true });
            _this.props.fetchStaffSchedule(_this.state.staffID, dateTime || _this.getURLDateTime()).then(function (res) {
                _this.setState({ loadingSchedule: false });
            });
        };
        _this.handlePrevious = function () {
            if (_this.props.schedule.previous) {
                _this.fetchSchedule(_this.props.schedule.previous);
                _this.setURLDateTime(_this.props.schedule.previous);
            }
        };
        _this.handleNext = function () {
            if (_this.props.schedule.next) {
                _this.fetchSchedule(_this.props.schedule.next);
                _this.setURLDateTime(_this.props.schedule.next);
            }
        };
        _this.handleDatePickerChange = function (date) {
            _this.fetchSchedule(date.toISOString());
            _this.setURLDateTime(date.toISOString());
        };
        _this.handleBlockClick = function (blockDetails) {
            _this.setState({ blockDetails: blockDetails });
        };
        _this.handleCalendarDialogOpen = function () {
            _this.setState({ calendarDialogOpen: true });
        };
        _this.handleCalendarDialogClose = function () {
            _this.setState({ calendarDialogOpen: false });
        };
        _this.handleTopicsDialogOpen = function (mode) {
            _this.setState({
                topicsDialogOpen: true,
                topcisDialogMode: mode
            });
        };
        _this.handleTopicsDialogClose = function () {
            _this.setState({ topicsDialogOpen: false });
        };
        _this.handleSetTopic = function () {
            _this.handleTopicsDialogOpen('select');
            _this.setState({ onTopicSelect: _this.onTopicSet });
        };
        _this.onTopicSet = function (topic) {
            _this.setState({ loadingSetTopic: true });
            var topicSchedule = {
                topic_id: topic.id,
                block_id: _this.state.blockDetails.block_id,
                date: _this.state.blockDetails.date
            };
            _this.props.createTopicSchedule(topicSchedule)
                .then(function () {
                _this.props.fetchStaffSchedule(_this.state.staffID, _this.getURLDateTime())
                    .then(function () {
                    _this.setState({
                        loadingSetTopic: false,
                        calendarDialogOpen: false
                    });
                    _this.props.queueSnackbar({
                        message: 'Set Topic successfully.'
                    });
                });
            })
                .catch(function () {
                _this.setState({ loadingSetTopic: false });
            });
        };
        _this.onRemoveTopic = function (topicSchedule) {
            return _this.props.deleteTopicSchedule(topicSchedule.id)
                .then(function () {
                return _this.props.fetchStaffSchedule(_this.state.staffID, _this.getURLDateTime())
                    .then(function () {
                    _this.props.queueSnackbar({
                        message: 'Removed Topic successfully.'
                    });
                });
            });
        };
        return _this;
    }
    StaffProfile.prototype.componentWillMount = function () {
        var params = this.props.match.params;
        var staffID = Number(params.staffID);
        this.setState({ staffID: staffID });
    };
    StaffProfile.prototype.componentDidMount = function () {
        var _this = this;
        this.fetchSchedule();
        this.setState({ loadingProfile: true });
        this.props.fetchStaffSchedule(this.state.staffID).then(function (res) {
            _this.setState({ loadingSchedule: false });
        });
        this.props.fetchStaffProfile(this.state.staffID).then(function (res) {
            _this.setState({ loadingProfile: false });
        });
    };
    StaffProfile.prototype.render = function () {
        var _this = this;
        var isOwner = this.props.currentUser.account_type === 'staff'
            && this.state.staffID === this.props.currentUser.details.id;
        var starred = this.props.newStarred && this.props.newStarred.item_id === this.props.staff.id
            && this.props.newStarred.item_type === 'staff' ? (this.props.newStarred.isStarred !== false) : this.props.staff.starred;
        var avatarColor = this.props.staff.color || null;
        var _a = this.state, menuRef = _a.menuRef, editDialogOpen = _a.editDialogOpen;
        var menuOpen = Boolean(this.state.menuRef);
        var calendar = null;
        if (this.props.schedule && !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["isEmpty"])(this.props.schedule)) {
            calendar = this.props.schedule.schedule.map(function (scheduleDay) {
                var calendarDay = {
                    date: scheduleDay.date,
                    events: scheduleDay.events,
                    blocks: scheduleDay.blocks.map(function (block) {
                        var title = block.flex ? (block.scheduled ? block.scheduled.topic.memo : 'No Schedule') : block.scheduled.name;
                        var amendments = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["makeArray"])(block.amendments);
                        var appointments = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["makeArray"])(block.appointments);
                        var ledgerEntries = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["makeArray"])(block.logs);
                        var topic = block.flex && block.scheduled ? Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["makeArray"])(block.scheduled) : undefined;
                        var planned = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["makeArray"])(block.planned);
                        var missedAppointment = !block.pending && appointments.some(function (appointment) {
                            return ledgerEntries.every(function (ledgerEntry) {
                                return appointment.staff.id !== ledgerEntry.staff.id;
                            });
                        });
                        var variant = missedAppointment ? 'missed' : (block.flex && block.scheduled ? block.scheduled.topic.color : 'pending');
                        var data = {
                            amendments: amendments,
                            appointments: appointments,
                            ledgerEntries: ledgerEntries,
                            topic: topic,
                            planned: planned
                        };
                        var details = {
                            block_id: block.id,
                            date: scheduleDay.date.day + " " + scheduleDay.date.full_date,
                            start: block.start,
                            end: block.end,
                            flex: block.flex,
                            label: block.label,
                            pending: block.pending,
                            data: data
                        };
                        var calendarBlock = {
                            title: title,
                            variant: variant,
                            badgeCount: block.appointments.length || 0,
                            details: details
                        };
                        return calendarBlock;
                    })
                };
                return calendarDay;
            });
        }
        var calendarDialogGroups = [
            {
                name: 'Amendments',
                keys: ['amendments'],
                itemMaps: [
                    function (amendment) { return ({
                        id: amendment.id,
                        time: 'Amended',
                        title: amendment.staff.name,
                        memo: amendment.memo,
                        method: 'amendment',
                        variant: 'default'
                    }); }
                ]
            },
            {
                name: 'Logs',
                keys: ['ledgerEntries'],
                itemMaps: [
                    function (log) { return ({
                        id: log.id,
                        time: log.time,
                        title: log.student.name,
                        variant: 'success',
                        method: log.method
                    }); }
                ],
                emptyState: function () { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "No attendance recorded")); }
            },
            {
                name: 'Appointments',
                keys: ['appointments'],
                itemMaps: [
                    function (appointment, blockDetails) { return ({
                        id: appointment.id,
                        title: appointment.student.name,
                        memo: appointment.memo,
                        variant: blockDetails.pending ? 'pending' : (blockDetails.data.ledgerEntries
                            && blockDetails.data.ledgerEntries.some((function (log) { return (log.staff.id === appointment.staff.id); })) ? 'success' : 'fail')
                    }); }
                ],
                emptyState: function () { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "No appointments booked")); },
                actions: function (appointment, blockDetails) {
                    return !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["isEmpty"])(appointment)
                        && _this.props.currentUser.account_type === 'staff'
                        && (_this.props.currentUser.details.administrator === true
                            || _this.props.currentUser.details.id === appointment.staff.id)
                        && blockDetails.pending ?
                        [
                            {
                                value: 'Cancel Appointment',
                                callback: function () { return Promise.resolve(_this.handleCancelAppointmentDialogOpen(appointment)); }
                            }
                        ] : undefined;
                }
            },
            {
                name: 'Topic',
                keys: ['topic'],
                emptyState: function (blockDetails) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "Nothing scheduled"),
                    (blockDetails.flex && blockDetails.pending && isOwner) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_14__["LoadingButton"], { loading: _this.state.loadingSetTopic, variant: 'text', color: 'primary', onClick: function () { return _this.handleSetTopic(); } }, "Set Topic")))); },
                itemMaps: [
                    function (topicSchedule, blockDetails) { return ({
                        id: topicSchedule.id,
                        title: topicSchedule.topic.memo,
                        variant: topicSchedule.topic.color,
                        memo: topicSchedule.topic.unavailable ? 'Unavailable' : undefined
                    }); }
                ],
                actions: function (topicSchedule, blockDetails) {
                    return !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["isEmpty"])(topicSchedule)
                        && blockDetails.flex
                        && blockDetails.pending
                        && isOwner ?
                        [
                            // { value: 'Change Topic', callback: () => Promise.resolve(this.handleTopicsDialogOpen('select')) },
                            { value: 'Remove Topic', callback: function () { return _this.onRemoveTopic(topicSchedule); }, closeOnCallback: true }
                        ] : undefined;
                }
            },
            {
                name: 'Scheduled',
                keys: ['planned'],
                emptyState: function () { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'empty_text' }, "No students scheduled")); },
                children: function (student) { return ([
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, student.name)
                ]); },
                itemMaps: [
                    function (schedulePlan, blockDetails) { return ({
                        id: schedulePlan.id,
                        title: schedulePlan.student.name,
                        variant: blockDetails.pending ? 'pending' : (blockDetails.data.ledgerEntries
                            && blockDetails.data.ledgerEntries.some((function (log) { return (log.student.id === schedulePlan.student.id); })) ? 'success' : 'fail')
                    }); }
                ],
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'content', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_CancelAppointment__WEBPACK_IMPORTED_MODULE_13__["CancelAppointment"], { open: this.state.cancelAppointmentDialogOpen, appointment: this.state.cancelAppointment, onClose: this.handleCancelAppointmentDialogClose, onSubmit: this.handleCancelAppointment }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_TopicsDialog__WEBPACK_IMPORTED_MODULE_17__["default"], { open: this.state.topicsDialogOpen, onClose: this.handleTopicsDialogClose, mode: this.state.topcisDialogMode, onSelect: this.state.onTopicSelect }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'profile' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_19__["TopNav"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: 'profile_title' }, this.state.loadingProfile ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { height: 56, width: 368 } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { height: 56, width: 368 },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 0, y: 4, rx: 24, ry: 24, height: 48, width: 48 }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 64, y: 8, rx: 4, ry: 4, height: 24, width: 164 }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 240, y: 8, rx: 4, ry: 4, height: 24, width: 128 }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 64, y: 40, rx: 4, ry: 4, height: 12, width: 84 })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Avatar"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('profile_avatar', "--" + avatarColor) }, this.props.staff.initials),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: 'name' },
                                    this.props.staff.name,
                                    this.props.staff.administrator && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'grade' }, "Administrator")))))))),
                    this.state.loadingProfile ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { height: 56, width: 80 } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { height: 56, width: 80 },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 0, y: 12, rx: 24, ry: 24, height: 36, width: 36 }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 44, y: 12, rx: 24, ry: 24, height: 36, width: 36 })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: 'right_col' }, isOwner ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Set Capacity' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_CapacityWidget__WEBPACK_IMPORTED_MODULE_15__["default"], { capacity: this.props.currentUser.account_type === 'staff' ? this.props.currentUser.details.capacity : -1 }))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'Topics' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { onClick: function () { return _this.handleTopicsDialogOpen('edit'); } },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "school")))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_ChangePasswordWidget__WEBPACK_IMPORTED_MODULE_16__["default"], { variant: 'dialog' })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StarButton__WEBPACK_IMPORTED_MODULE_18__["StarButton"], { onClick: function () { return _this.toggleStarred(starred); }, isStarred: starred })))))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_12__["Calendar"], { hasNext: Boolean(this.props.schedule.next), hasPrevious: Boolean(this.props.schedule.previous), loading: this.state.loadingSchedule || !calendar, rangeLabel: this.props.schedule.range, minDate: this.props.schedule.min_date, maxDate: this.props.schedule.max_date, calendar: calendar, calendarDialogGroups: calendarDialogGroups, onNext: this.handleNext, onPrevious: this.handlePrevious, onDatePickerChange: this.handleDatePickerChange, onBlockClick: this.handleBlockClick, dialogOpen: this.state.calendarDialogOpen, onDialogOpen: this.handleCalendarDialogOpen, onDialogClose: this.handleCalendarDialogClose, onRefresh: function () { return _this.fetchSchedule(); } }))));
    };
    return StaffProfile;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    staff: state.staffProfile.staff,
    schedule: state.staffSchedule.schedule,
    newStarred: state.starred.item,
}); };
var mapDispatchToProps = {
    createTopicSchedule: _actions_topicActions__WEBPACK_IMPORTED_MODULE_10__["createTopicSchedule"],
    deleteTopicSchedule: _actions_topicActions__WEBPACK_IMPORTED_MODULE_10__["deleteTopicSchedule"],
    fetchStaffProfile: _actions_staffProfileActions__WEBPACK_IMPORTED_MODULE_6__["fetchStaffProfile"],
    fetchStaffSchedule: _actions_staffScheduleActions__WEBPACK_IMPORTED_MODULE_7__["fetchStaffSchedule"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_5__["queueSnackbar"],
    starItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_8__["starItem"],
    unstarItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_8__["unstarItem"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(StaffProfile));


/***/ }),

/***/ "VO18":
/*!*********************************************************************************************!*\
  !*** ./resources/src/components/Sidebar/NotificationsWidget/NotificationDispatchWidget.tsx ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_staffActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/staffActions */ "XGI3");
/* harmony import */ var _ChipSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ChipSelect */ "3k4I");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var NotificationDispatchWidget = /** @class */ (function (_super) {
    __extends(NotificationDispatchWidget, _super);
    function NotificationDispatchWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loadingStaff: false,
            message: '',
            recipients: [],
            queryResults: []
        };
        _this.handleChangeMessage = function (event) {
            _this.setState({ message: event.target.value });
        };
        _this.handleSendNotification = function () {
            var recipientIds = _this.state.recipients.map(function (chip) { return chip.value; });
            _this.props.onSubmit(_this.state.message, recipientIds);
        };
        _this.handleCancel = function () {
            _this.props.onCancel();
        };
        _this.handleRemoveRecipient = function (index) {
            _this.setState(function (state) { return ({
                recipients: state.recipients
            }); });
        };
        _this.handleSelectRecipient = function (chip) {
            _this.setState(function (state) { return ({
                recipients: state.recipients.concat([chip])
            }); });
        };
        _this.handleQueryChange = function (query) {
            if (!query) {
                return;
            }
            if (_this.props.staff && _this.props.staff.length > 0) {
                _this.setState({
                    queryResults: _this.props.staff
                        .filter(function (staff) { return (staff.first_name.startsWith(query)
                        || staff.last_name.startsWith(query)
                        || staff.first_name.includes(query)
                        || staff.last_name.includes(query)); })
                        .slice(0, 15)
                        .map(function (staff) { return ({
                        avatar: { color: staff.color, initials: staff.initials },
                        label: staff.name,
                        value: staff.id,
                        selected: _this.state.recipients.some(function (recipient) { return recipient.value === staff.id; })
                    }); })
                });
            }
        };
        return _this;
    }
    NotificationDispatchWidget.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ loadingStaff: true });
        this.props.fetchStaff().then(function () {
            _this.setState({ loadingStaff: false });
        });
    };
    NotificationDispatchWidget.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h6' }, "Recipients"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChipSelect__WEBPACK_IMPORTED_MODULE_4__["default"], { chips: this.state.recipients, onRemoveChip: this.handleRemoveRecipient, onCreateChip: this.handleSelectRecipient, queryResults: this.state.queryResults, placeholder: 'Recipients', onSearch: this.handleQueryChange }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h6' }, "Your Message"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'notifications_modal__textfield' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { value: this.state.message, onChange: this.handleChangeMessage, variant: 'outlined', color: 'primary', multiline: true, fullWidth: true, placeholder: 'Compose your Notification', label: 'Message' })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'notifications_modal__actions' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: 'primary', variant: 'text', disabled: this.state.message.length === 0, onClick: function () { return _this.handleSendNotification(); } }, "Send"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { onClick: function () { return _this.handleCancel(); } }, "Cancel"))));
    };
    return NotificationDispatchWidget;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    staff: state.staff.items
}); };
var mapDispatchToProps = { fetchStaff: _actions_staffActions__WEBPACK_IMPORTED_MODULE_3__["fetchStaff"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NotificationDispatchWidget));


/***/ }),

/***/ "Vdut":
/*!*******************************************************************!*\
  !*** ./resources/src/components/Modals/ConfirmPasswordDialog.tsx ***!
  \*******************************************************************/
/*! exports provided: ConfirmPasswordDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmPasswordDialog", function() { return ConfirmPasswordDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/http */ "Oh+x");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");




var ConfirmPasswordDialog = function (props) {
    var helperText = "That didn't work. Please try again.";
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(''), password = _a[0], setPassword = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), errored = _c[0], setErrored = _c[1];
    var handleAuthorization = function () {
        setLoading(true);
        setErrored(false);
        Object(_utils_http__WEBPACK_IMPORTED_MODULE_2__["verifyPassword"])(password)
            .then(function (res) {
            if (props.onVerification) {
                props.onVerification().then(function () {
                    handleCompletion();
                });
            }
            else {
                handleCompletion();
            }
        })
            .catch(function (reason) {
            setLoading(false);
            setErrored(true);
        });
        return;
    };
    var handleChange = function (event) {
        event.preventDefault();
        setPassword(event.target.value);
        setErrored(false);
    };
    var handleCompletion = function () {
        setLoading(false);
        props.onClose();
        if (props.onSubmit) {
            props.onSubmit(password);
        }
    };
    var onExited = function () {
        setPassword('');
        setErrored(false);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open, onExited: function () { return onExited(); } },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, props.dialogTitle || 'Confirm Authorization'),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { autoComplete: 'off' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, props.actionItems ? ('Please confirm your password to perform the following actions:') : ('This action requires you to confirm your password.')),
                props.actionItems && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", { className: 'password_confirm_dialog_list' }, props.actionItems.map(function (actionItem, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { key: index }, actionItem)); }))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { name: 'password', value: password, onChange: handleChange, disabled: loading, error: errored, helperText: errored ? helperText : undefined, variant: 'outlined', type: 'password', label: 'Password', fullWidth: true, required: true, autoFocus: true, margin: 'normal' })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_3__["LoadingButton"], { type: 'submit', loading: loading, variant: 'text', color: 'primary', disabled: password.length === 0, onClick: function () { return handleAuthorization(); } }, "Continue")))));
};


/***/ }),

/***/ "VeNm":
/*!************************************************************!*\
  !*** ./resources/src/components/Modals/CapacityWidget.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_staffActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/staffActions */ "XGI3");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var CapacityWidget = /** @class */ (function (_super) {
    __extends(CapacityWidget, _super);
    function CapacityWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            capacity: _this.props.capacity,
            loading: false,
            open: false
        };
        _this.handleOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        _this.handleChange = function (event) {
            _this.setState({ capacity: event.target.value });
        };
        _this.handleSubmit = function () {
            _this.setState({ loading: true });
            _this.props.setCapacity(_this.state.capacity)
                .then(function () {
                _this.setState({ loading: false });
                _this.props.queueSnackbar({
                    message: 'Updated capacity.'
                });
            });
        };
        return _this;
    }
    CapacityWidget.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Set Capacity' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { onClick: function () { return _this.handleOpen(); } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "open_with"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: this.state.open },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], null, "Set Capacity"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, "Set the capacity for your classroom."),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { type: 'number', variant: 'filled', label: 'Capacity', value: this.state.capacity, onChange: this.handleChange })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return _this.handleClose(); } }, "Close"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__["LoadingButton"], { variant: 'text', color: 'primary', loading: this.state.loading, onClick: function () { return _this.handleSubmit(); } }, "Update")))));
    };
    return CapacityWidget;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapDispatchToProps = { queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__["queueSnackbar"], setCapacity: _actions_staffActions__WEBPACK_IMPORTED_MODULE_4__["setCapacity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(CapacityWidget));


/***/ }),

/***/ "X14/":
/*!******************************************************************!*\
  !*** ./resources/src/components/Modals/ChangePasswordWidget.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/http */ "Oh+x");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EnhancedDialogTitle */ "ePNl");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
    loading: false,
    loadingSignOut: false,
    errored: false,
    passwordTooShort: false,
    unmatchedPasswords: false,
    disallowedPassword: false,
    open: false
};
var ChangePasswordWidget = /** @class */ (function (_super) {
    __extends(ChangePasswordWidget, _super);
    function ChangePasswordWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = initialState;
        _this.handleOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
            if (_this.props.onSignOut) {
                _this.setState({ loadingSignOut: true });
                _this.props.onSignOut().then(function () {
                    _this.setState({ loadingSignOut: false });
                    if (_this.props.onClose) {
                        _this.props.onClose();
                    }
                });
            }
            else if (_this.props.onClose) {
                _this.props.onClose();
            }
        };
        _this.handleSubmit = function () {
            if (_this.state.newPassword.length < 8) {
                _this.setState({ passwordTooShort: true });
                return;
            }
            else if (!_this.state.showPassword && _this.state.newPassword !== _this.state.confirmPassword) {
                _this.setState({ unmatchedPasswords: true });
                return;
            }
            else if (_this.props.disallowed
                && _this.props.disallowed.some(function (password) { return password === _this.state.newPassword; })) {
                _this.setState({ disallowedPassword: true });
                return;
            }
            _this.setState({
                loading: true,
                errored: false
            });
            Object(_utils_http__WEBPACK_IMPORTED_MODULE_4__["changePassword"])(_this.state.oldPassword, _this.state.newPassword)
                .then(function () {
                _this.setState(initialState);
                if (_this.props.onChangePassword) {
                    _this.props.onChangePassword();
                }
                else {
                    _this.props.queueSnackbar({ message: 'Changed passsword.' });
                }
            })
                .catch(function () {
                _this.setState({
                    loading: false,
                    errored: true
                });
            });
        };
        _this.handleChange = function (event, field) {
            if (_this.state.loading) {
                return;
            }
            var value = event.target.value;
            _this.setState({ errored: false });
            switch (field) {
                case 'old':
                    _this.setState({ oldPassword: value });
                    return;
                case 'new':
                    _this.setState({
                        passwordTooShort: false,
                        disallowedPassword: false,
                        newPassword: value
                    });
                    return;
                case 'confirm':
                    _this.setState({
                        confirmPassword: value,
                        unmatchedPasswords: false
                    });
                    return;
            }
        };
        _this.toggleShowPassword = function () {
            if (_this.state.loading) {
                return;
            }
            if (_this.state.showPassword) {
                _this.setState({
                    showPassword: false,
                    confirmPassword: ''
                });
            }
            else {
                _this.setState({ showPassword: true });
            }
        };
        return _this;
    }
    ChangePasswordWidget.prototype.render = function () {
        var _this = this;
        var passwordForm = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__["EnhancedDialogTitle"], { title: 'Change Password', onClose: this.props.variant === 'dialog' ? this.handleClose : undefined }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
                this.props.isRequiredChange && (
                // tslint:disable-next-line: max-line-length
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], { color: 'error' }, "Your old password has expired and must be changed.")),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, "Enter your old password, followed by your new password. Passwords must be at least 8 characters long."),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'old_password', label: 'Old Password', variant: 'outlined', type: 'password', value: this.state.oldPassword, onChange: function (event) { return _this.handleChange(event, 'old'); }, fullWidth: true, autoFocus: true, required: true, error: this.state.errored, helperText: this.state.errored ? 'That didn\'t work. Please try again.' : undefined, margin: 'normal' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'new_password', label: 'New Password', variant: 'outlined', type: this.state.showPassword && !this.state.loading ? 'text' : 'password', value: this.state.newPassword, onChange: function (event) { return _this.handleChange(event, 'new'); }, fullWidth: true, required: true, error: this.state.passwordTooShort || this.state.disallowedPassword, helperText: this.state.passwordTooShort
                        ? 'Password must be at least 8 characters.'
                        : (this.state.disallowedPassword ? 'You cannot use that password.' : undefined), margin: 'normal', InputProps: {
                        endAdornment: (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], { position: 'end' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { edge: 'end', onClick: function () { return _this.toggleShowPassword(); } },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, this.state.showPassword ? 'visibility_off' : 'visibility')))),
                    } }),
                !this.state.showPassword && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'confirm_password', label: 'Confirm Password', variant: 'outlined', type: 'password', value: this.state.confirmPassword, onChange: function (event) { return _this.handleChange(event, 'confirm'); }, fullWidth: true, required: !this.state.showPassword, error: this.state.unmatchedPasswords, helperText: this.state.unmatchedPasswords ? 'Passwords don\'t match.' : undefined, margin: 'normal' }))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__["LoadingButton"], { variant: 'text', onClick: function () { return _this.handleClose(); }, loading: this.state.loadingSignOut }, "Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__["LoadingButton"], { variant: 'contained', color: 'primary', onClick: function () { return _this.handleSubmit(); }, loading: this.state.loading, disabled: this.state.oldPassword.length === 0 || this.state.newPassword.length === 0 }, "Submit"))));
        return (this.props.variant === 'persistant' ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Card"], { className: 'change_password_card' }, passwordForm)) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Change Password' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { onClick: function () { return _this.handleOpen(); } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "lock"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: this.state.open }, passwordForm))));
    };
    return ChangePasswordWidget;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapDispatchToProps = { queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__["queueSnackbar"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(ChangePasswordWidget));


/***/ }),

/***/ "XGI3":
/*!***********************************************!*\
  !*** ./resources/src/actions/staffActions.ts ***!
  \***********************************************/
/*! exports provided: fetchStaff, createStaff, deleteStaff, updateStaff, setCapacity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStaff", function() { return fetchStaff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStaff", function() { return createStaff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteStaff", function() { return deleteStaff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStaff", function() { return updateStaff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCapacity", function() { return setCapacity; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var fetchStaff = function () { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/staff')
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STAFF"],
        payload: res.data
    }); });
}; };
var createStaff = function (staffData, password) { return function (dispatch) {
    var data = __assign({}, staffData, { password: password });
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/staff', data)
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["NEW_STAFF"],
        payload: res.data
    }); });
}; };
var deleteStaff = function (staffID) { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/api/staffs" + staffID)
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["DELETE_STAFF"],
        payload: res.data
    }); });
}; };
var updateStaff = function (staffData) { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.put('/api/staffs', staffData)
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_STAFF"],
        payload: res.data
    }); });
}; };
var setCapacity = function (capacity) { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/staff/capacity', { capacity: capacity });
}; };


/***/ }),

/***/ "XOpI":
/*!**************************************************************!*\
  !*** ./resources/src/components/Table/EnhancedTableHead.tsx ***!
  \**************************************************************/
/*! exports provided: EnhancedTableHead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnhancedTableHead", function() { return EnhancedTableHead; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var EnhancedTableHead = function (props) {
    var onSelectAllClick = props.onSelectAllClick, order = props.order, orderBy = props.orderBy, numSelected = props.numSelected, rowCount = props.rowCount, selectable = props.selectable, link = props.link;
    var columns = props.columns.filter(function (column) {
        return column.visible;
    });
    var createSortHandler = function (property) {
        props.onRequestSort(property);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableHead"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableRow"], null,
            selectable && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], { padding: 'checkbox' }, props.radio ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Radio"], { checked: numSelected > 0, onClick: onSelectAllClick, color: 'primary' })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { indeterminate: numSelected > 0 && numSelected < rowCount, checked: numSelected === rowCount, onChange: onSelectAllClick, color: 'primary' })))),
            columns.map(function (column, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], { key: column.id, align: column.isNumeric ? 'right' : 'left', padding: column.disablePadding ? (!selectable && index === 0 ? 'default' : 'none') : 'default', sortDirection: orderBy === column.id ? order : false },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], { title: 'Sort by ' + column.label, placement: column.isNumeric ? 'bottom-end' : 'bottom-start', enterDelay: 300 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableSortLabel"], { active: orderBy === column.id, direction: order, onClick: function () { return createSortHandler(column.id); } }, column.label)))); }),
            (link && selectable) && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], { key: props.link.key, align: 'left', padding: 'default' }, link.label)))));
};


/***/ }),

/***/ "Ysj4":
/*!****************************************************************!*\
  !*** ./resources/src/components/Table/EnhancedTableFilter.tsx ***!
  \****************************************************************/
/*! exports provided: EnhancedTableFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnhancedTableFilter", function() { return EnhancedTableFilter; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var stringFilterRules = [
    { label: 'Equal to', value: 'equal-to' },
    { label: 'Not equal to', value: 'not-equal-to' },
    { label: 'Starts with', value: 'starts-with' },
    { label: 'Ends with', value: 'ends-with' },
    { label: 'Contains', value: 'contains' }
];
var numericFilterRules = [
    { label: 'Less than', value: 'less-than' },
    { label: 'Greater than', value: 'greater-than' },
    { label: 'Equal to', value: 'equal-to' },
    { label: 'Not equal to', value: 'not-equal-to' }
];
var EnhancedTableFilter = /** @class */ (function (_super) {
    __extends(EnhancedTableFilter, _super);
    function EnhancedTableFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            disabled: _this.props.disabled,
            error: false,
            filters: _this.props.filters.length ? _this.props.filters : [_this.newFilter()]
        };
        _this.onApplyFilters = function () {
            _this.setState({ error: false });
            if (_this.allFiltersValid() || _this.state.disabled) {
                _this.setState({ error: false });
                _this.props.handleFilterChange(_this.state.filters, _this.state.disabled);
                return true;
            }
            else {
                _this.setState({ error: true });
                return false;
            }
        };
        _this.onUpdateFilters = function () {
            if (_this.onApplyFilters()) {
                _this.handleClose();
            }
        };
        _this.onCancelFilters = function () {
            _this.setState({ filters: _this.props.filters });
            _this.handleClose();
        };
        _this.onAddFilter = function () {
            _this.setState(function (state) {
                return { filters: state.filters.concat(_this.newFilter()) };
            });
        };
        _this.onRemoveFilter = function (index) {
            _this.setState(function (state) {
                return {
                    filters: state.filters.filter(function (filter, idx) {
                        return index !== idx;
                    })
                };
            });
        };
        _this.onDuplicateFilter = function (index) {
            _this.setState(function (state) {
                var newFilter = state.filters.find(function (filter, idx) {
                    return index === idx;
                });
                return {
                    filters: state.filters.concat([newFilter])
                };
            });
        };
        _this.handleChangeFilterID = function (event, index) {
            var value = event.target.value;
            _this.setState(function (state) {
                var filters = state.filters.map(function (filter, idx) {
                    if (idx !== index) {
                        return filter;
                    }
                    else {
                        var column = _this.props.columns.find(function (tableColumn) {
                            return tableColumn.id === value;
                        });
                        var nextType = column.values && column.values.length
                            ? 'enum'
                            : (column.isNumeric ? 'numeric' : 'string');
                        var hasTypeChanged = filter.type !== nextType || filter.type === 'enum';
                        var newFilter = void 0;
                        if (nextType === 'enum') {
                            newFilter = {
                                id: value,
                                value: hasTypeChanged ? column.values[0] : filter.value,
                                type: 'enum'
                            };
                        }
                        else if (nextType === 'numeric') {
                            newFilter = {
                                id: value,
                                value: hasTypeChanged ? '' : filter.value,
                                type: 'numeric',
                                rule: hasTypeChanged ? numericFilterRules[0].value : filter.rule
                            };
                        }
                        else {
                            newFilter = {
                                id: value,
                                value: hasTypeChanged ? '' : filter.value,
                                type: 'string',
                                rule: hasTypeChanged ? stringFilterRules[0].value : filter.rule
                            };
                        }
                        return newFilter;
                    }
                });
                return { filters: filters };
            });
        };
        _this.handleChangeFilterRule = function (event, index) {
            var value = event.target.value;
            _this.setState(function (state) {
                return {
                    filters: state.filters.map(function (filter, idx) {
                        return index !== idx ? filter : __assign({}, filter, { rule: value });
                    })
                };
            });
        };
        _this.handleChangeFilterValue = function (event, index) {
            var value = event.target.value;
            _this.setState(function (state) {
                return {
                    filters: state.filters.map(function (filter, idx) {
                        return index !== idx ? filter : __assign({}, filter, { value: value });
                    })
                };
            });
        };
        _this.handleClose = function () {
            _this.props.handleFilterClose();
        };
        _this.allFiltersValid = function () {
            return _this.state.filters.length ? (_this.state.filters.every(function (filter) {
                return filter.value.length > 0;
            })) : true;
        };
        _this.toggleDisabled = function () {
            _this.setState(function (state) {
                return {
                    disabled: !state.disabled,
                    error: false
                };
            });
        };
        return _this;
    }
    EnhancedTableFilter.prototype.newFilter = function () {
        var filter;
        if (this.props.filters.length) {
            filter = __assign({}, this.props.filters[this.props.filters.length - 1], { value: '' });
        }
        else {
            var firstColumn = this.props.columns[0];
            if (firstColumn.values && firstColumn.values.length > 0) {
                filter = {
                    id: firstColumn.id,
                    type: 'enum',
                    value: firstColumn.values[0]
                };
            }
            else if (firstColumn.isNumeric) {
                filter = {
                    id: firstColumn.id,
                    type: 'numeric',
                    rule: numericFilterRules[0].value,
                    value: ''
                };
            }
            else {
                filter = {
                    id: firstColumn.id,
                    type: 'string',
                    rule: stringFilterRules[0].value,
                    value: ''
                };
            }
        }
        return filter;
    };
    EnhancedTableFilter.prototype.render = function () {
        var _this = this;
        var haveFiltersChanged = this.state.filters.length === this.props.filters.length ? (!this.state.filters.every(function (filter, index) {
            var propFilter = _this.props.filters[index];
            var fitlerKeys = Object.keys(propFilter);
            return fitlerKeys.every(function (key) {
                return filter[key] === propFilter[key];
            });
        }) || this.props.disabled !== this.state.disabled) : true;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grow"], { in: this.props.open },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], { className: 'enhanced-table__filters', elevation: 6 },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'filters-header' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormControlLabel"], { control: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Switch"], { checked: !this.state.disabled, onClick: function () { return _this.toggleDisabled(); }, color: 'primary' }), label: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h6' }, "Filters"), labelPlacement: 'start' })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                    this.state.filters.map(function (filter, idx) {
                        var errored = _this.state.error && filter.value.length === 0;
                        var isEnum = filter.type === 'enum';
                        var column = _this.props.columns.find(function (tableColumn) {
                            return tableColumn.id === filter.id;
                        });
                        var filterRules = null;
                        if (filter.type === 'string') {
                            filterRules = stringFilterRules;
                        }
                        else if (filter.type === 'numeric') {
                            filterRules = numericFilterRules;
                        }
                        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { key: idx, className: 'filter-rule' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Select"], { name: 'id', margin: 'dense', value: filter.id, onChange: function (event) { _this.handleChangeFilterID(event, idx); }, disabled: _this.state.disabled }, _this.props.columns.map(function (tableColumn) {
                                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { key: tableColumn.id, value: tableColumn.id }, tableColumn.label));
                            })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Select"], { name: 'rule', className: classnames__WEBPACK_IMPORTED_MODULE_0___default()({ '--enum': isEnum }), margin: 'dense', value: isEnum ? filter.value : filter.rule, onChange: function (event) { return isEnum
                                    ? _this.handleChangeFilterValue(event, idx)
                                    : _this.handleChangeFilterRule(event, idx); }, disabled: _this.state.disabled }, isEnum ? (column.values.map(function (enumValue) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { value: enumValue, key: enumValue }, enumValue)); })) : (filterRules.map(function (filterRule) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { value: filterRule.value, key: filterRule.value }, filterRule.label)); }))),
                            !isEnum && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { variant: 'standard', margin: 'dense', placeholder: 'Filter value', onChange: function (event) { return _this.handleChangeFilterValue(event, idx); }, value: filter.value, error: errored, helperText: errored ? 'This field cannot be empty.' : undefined, disabled: _this.state.disabled })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { onClick: function () { return _this.onDuplicateFilter(idx); }, disabled: _this.state.disabled },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "filter_none")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { disabled: _this.state.filters.length === 1 || _this.state.disabled, onClick: function () { return _this.onRemoveFilter(idx); } },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "close"))));
                    }),
                    this.state.filters.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: 'filter-rule_placeholder' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { disabled: this.state.disabled, onClick: function () { return _this.onAddFilter(); } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "add"))))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'filters-actions' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', color: 'primary', onClick: function () { return _this.onUpdateFilters(); } }, "OK"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', color: 'primary', disabled: !haveFiltersChanged, onClick: function () { return _this.onApplyFilters(); } }, "Apply"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return _this.onCancelFilters(); } }, "Cancel")))));
    };
    return EnhancedTableFilter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "a3Cx":
/*!***********************************************!*\
  !*** ./resources/src/components/Snackbar.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/snackbarActions */ "Eccy");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Snackbar = /** @class */ (function (_super) {
    __extends(Snackbar, _super);
    function Snackbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: true
        };
        _this.handleExited = function () {
            _this.props.getNextSnackbar();
            window.setTimeout(function () { return _this.handleOpen(); }, 200);
        };
        _this.handleOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    Snackbar.prototype.componentWillReceiveProps = function (nextProps) {
        if (!nextProps.currentSnackbar) {
            if (nextProps.snackbars.length === 0) {
                return;
            }
            this.props.getNextSnackbar();
        }
    };
    Snackbar.prototype.render = function () {
        var _this = this;
        var snackbar = this.props.currentSnackbar;
        var messageStyle = {
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipses'
        };
        return !snackbar ? null : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Snackbar"], { anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
            }, open: this.state.open, onClose: this.handleClose, onExited: this.handleExited, message: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { style: messageStyle }, snackbar.message), action: [
                snackbar.buttons && snackbar.buttons.map(function (button, index) {
                    var onClick = function () {
                        _this.handleClose();
                        button.callback();
                    };
                    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { key: index, color: 'secondary', onClick: onClick }, button.value);
                }),
                snackbar.links && snackbar.links.map(function (link, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: link.to, key: index },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: 'secondary' }, link.value))); })
            ] }));
    };
    return Snackbar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentSnackbar: state.snackbars.item,
    snackbars: state.snackbars.items
}); };
var mapDispatchToProps = { getNextSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_4__["dequeueSnackbar"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Snackbar));


/***/ }),

/***/ "aT6W":
/*!**************************************************!*\
  !*** ./resources/src/actions/settingsActions.ts ***!
  \**************************************************/
/*! exports provided: fetchSettings, fetchUnauthenticatedSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSettings", function() { return fetchSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUnauthenticatedSettings", function() { return fetchUnauthenticatedSettings; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchSettings = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/settings')
            .then(function (res) {
            var settings = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_SETTINGS"],
                payload: settings
            });
        });
    };
};
var fetchUnauthenticatedSettings = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/settings/unauthenticated')
            .then(function (res) {
            var settings = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_SETTINGS"],
                payload: settings
            });
        });
    };
};


/***/ }),

/***/ "b2WD":
/*!******************************************************!*\
  !*** ./resources/src/actions/staffProfileActions.ts ***!
  \******************************************************/
/*! exports provided: fetchStaffProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStaffProfile", function() { return fetchStaffProfile; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchStaffProfile = function (staffID) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/staff/profile/" + staffID)
            .then(function (res) {
            var staff = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STAFF_PROFILE"],
                payload: staff
            });
        });
    };
};


/***/ }),

/***/ "b4qL":
/*!*******************************************************!*\
  !*** ./resources/src/reducers/notificationReducer.ts ***!
  \*******************************************************/
/*! exports provided: notificationReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationReducer", function() { return notificationReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    inbox: [],
    outbox: []
};
var notificationReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["ARCHIVE_ALL_NOTIFICATIONS"]:
            return __assign({}, state, { inbox: [] });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["ARCHIVE_NOTIFICATION"]:
            return __assign({}, state, { inbox: state.inbox.filter(function (item) {
                    return item.notification.id !== action.payload.id;
                }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFICATION_INBOX"]:
            return __assign({}, state, { inbox: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFICATION_OUTBOX"]:
            return __assign({}, state, { outbox: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["MARK_ALL_NOTIFICATIONS_READ"]:
            return __assign({}, state, { inbox: state.inbox.map(function (item) {
                    return __assign({}, item, { read: true });
                }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["MARK_NOTIFICATION_READ"]:
            return __assign({}, state, { inbox: state.inbox.map(function (item) {
                    return item.notification.id === action.payload.id ? __assign({}, item, { read: true }) : item;
                }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["MARK_NOTIFICATION_UNREAD"]:
            return __assign({}, state, { inbox: state.inbox.map(function (item) {
                    return item.notification.id === action.payload.id ? __assign({}, item, { read: false }) : item;
                }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UNARCHIVE_NOTIFICATION"]:
            return state;
        default:
            return state;
    }
};


/***/ }),

/***/ "bjcN":
/*!*******************************************************!*\
  !*** ./resources/src/reducers/staffProfileReducer.ts ***!
  \*******************************************************/
/*! exports provided: staffProfileReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staffProfileReducer", function() { return staffProfileReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    staff: {}
};
var staffProfileReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STAFF_PROFILE"]:
            return __assign({}, state, { staff: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "boiz":
/*!*******************************************************!*\
  !*** ./resources/src/components/App/LoadingBadge.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var LoadingBadge = function () {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Fade"], { in: true },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'loading_badge' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", { id: 'b9017edc-87e2-42a6-a85f-f4c32a078fe3', xmlns: 'http://www.w3.org/2000/svg', width: '80.198', height: '80.254', viewBox: '0 0 80.198 80.254' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("linearGradient", { id: 'gradient-right', x1: '0%', y: '0%' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", { offset: '0%', stopColor: '#000' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("animate", { id: 'a3', attributeName: 'stop-color', dur: '2s', values: '#022740; #022740; #034872; #034872; #CCC; #DDD; #022740', begin: '0; a3.end' })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", { offset: '100%', stopColor: '#000' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("animate", { id: 'a1', attributeName: 'stop-color', dur: '2s', values: '#EEE; #022740; #022740; #034872; #034872; #CCC; #DDD', begin: '0; a1.end' }))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("linearGradient", { id: 'gradient-left', x1: '0%', y: '0%' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", { offset: '0%', stopColor: '#000' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("animate", { id: 'l1', attributeName: 'stop-color', dur: '2s', values: '#CCC; #DDD; #80f4ff; #80f4ff; #00caff; #00caff; #CCC', begin: '0; l1.end' })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", { offset: '100%', stopColor: '#000' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("animate", { id: 'l2', attributeName: 'stop-color', dur: '2s', values: '#00caff; #00caff; #CCC; #DDD; #80f4ff;  #80f4ff; #00caff', begin: '0; l2.end' }))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { className: 'left', style: { fill: "url('#gradient-left')" }, d: 'M26.207,41,41,26.207,55.373,11.834,46.84,3.3a8.234,8.234,0,0,0-11.678,0l-8.535,8.534-23.3,23.3a8.307,8.307,0,0,0,0,11.728l23.3,23.3L35.16,78.7a8.235,8.235,0,0,0,11.679,0l8.533-8.534L41,55.793Z', transform: 'translate(-0.901 -0.873)' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { className: 'right', style: { fill: "url('#gradient-right')" }, d: 'M78.675,35.136l-23.3-23.3L46.84,3.3a8.234,8.234,0,0,0-11.678,0l-8.535,8.534L41,26.207,55.793,41,41,55.793,26.627,70.165,35.16,78.7a8.235,8.235,0,0,0,11.679,0l8.533-8.534,23.3-23.3A8.3,8.3,0,0,0,78.675,35.136Z', transform: 'translate(-0.901 -0.873)' })))));
};
/* harmony default export */ __webpack_exports__["default"] = (LoadingBadge);


/***/ }),

/***/ "dPHG":
/*!*******************************************************!*\
  !*** ./resources/src/actions/notificationsActions.ts ***!
  \*******************************************************/
/*! exports provided: archiveAllNotifications, archiveNotification, fetchNotificationInbox, fetchNotificationOutbox, markAllNotificationsAsRead, markNotificationAsRead, markNotificationAsUnread, unarchiveNotification, sendNotification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archiveAllNotifications", function() { return archiveAllNotifications; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archiveNotification", function() { return archiveNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotificationInbox", function() { return fetchNotificationInbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotificationOutbox", function() { return fetchNotificationOutbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markAllNotificationsAsRead", function() { return markAllNotificationsAsRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markNotificationAsRead", function() { return markNotificationAsRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markNotificationAsUnread", function() { return markNotificationAsUnread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unarchiveNotification", function() { return unarchiveNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendNotification", function() { return sendNotification; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var archiveAllNotifications = function () {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put('/api/notifications/archive/all');
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["ARCHIVE_ALL_NOTIFICATIONS"],
            payload: null
        });
    };
};
var archiveNotification = function (notification) {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/api/notifications/archive/" + notification.id);
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["ARCHIVE_NOTIFICATION"],
            payload: notification
        });
    };
};
var fetchNotificationInbox = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/notifications/inbox')
            .then(function (res) {
            var notifications = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_NOTIFICATION_INBOX"],
                payload: notifications
            });
        });
    };
};
var fetchNotificationOutbox = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/notifications/outbox')
            .then(function (res) {
            var notifications = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_NOTIFICATION_OUTBOX"],
                payload: notifications
            });
        });
    };
};
var markAllNotificationsAsRead = function () {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put('/api/notifications/read/all');
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["MARK_ALL_NOTIFICATIONS_READ"],
            payload: null
        });
    };
};
var markNotificationAsRead = function (notification) {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/api/notifications/read/" + notification.id);
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["MARK_NOTIFICATION_READ"],
            payload: notification
        });
    };
};
var markNotificationAsUnread = function (notification) {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/api/notifications/unread/" + notification.id);
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["MARK_NOTIFICATION_UNREAD"],
            payload: notification
        });
    };
};
var unarchiveNotification = function (notification) {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/api/notifications/unarchive/" + notification.id);
        return dispatch({
            type: _types__WEBPACK_IMPORTED_MODULE_1__["UNARCHIVE_NOTIFICATION"],
            payload: notification
        });
    };
};
var sendNotification = function (request) {
    return function (dispatch) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/notifications', request)
            .then(function (response) {
            var notification = response.data;
            return dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["SEND_NOTIFICATION"],
                payload: notification
            });
        });
    };
};


/***/ }),

/***/ "diR5":
/*!*********************************************************!*\
  !*** ./resources/src/components/Sidebar/HelpWidget.tsx ***!
  \*********************************************************/
/*! exports provided: HelpWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpWidget", function() { return HelpWidget; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Modals_AboutSpotlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modals/AboutSpotlight */ "tDxb");
/* harmony import */ var _Modals_FeedbackDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Modals/FeedbackDialog */ "DfYx");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavItem */ "LBOG");






var HelpWidget = function () {
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null), menuRef = _a[0], setMenuRef = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), feedbackDialogOpen = _b[0], setFeedbackDialogOpen = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), aboutDialogOpen = _c[0], setAboutDialogOpen = _c[1];
    var menuOpen = Boolean(menuRef);
    var handleMenuOpen = function (event) {
        setMenuRef(event.currentTarget);
    };
    var handleMenuClose = function () {
        setMenuRef(null);
    };
    var handleFeedbackDialogOpen = function () {
        handleMenuClose();
        setFeedbackDialogOpen(true);
    };
    var handleAboutDialogOpen = function () {
        handleMenuClose();
        setAboutDialogOpen(true);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavItem__WEBPACK_IMPORTED_MODULE_5__["NavItem"], { icon: 'help', title: 'Help', onClick: handleMenuOpen }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Menu"], { open: menuOpen, anchorEl: menuRef, onClose: handleMenuClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { onClick: handleFeedbackDialogOpen }, "Provide Feedback"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { onClick: handleAboutDialogOpen }, "About Spotlight"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: '/wiki' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], null, "Spotlight Wiki"))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_FeedbackDialog__WEBPACK_IMPORTED_MODULE_4__["default"], { open: feedbackDialogOpen, onClose: function () { return setFeedbackDialogOpen(false); } }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_AboutSpotlight__WEBPACK_IMPORTED_MODULE_3__["AboutSpotlight"], { open: aboutDialogOpen, onClose: function () { return setAboutDialogOpen(false); } })));
};


/***/ }),

/***/ "e6C1":
/*!**********************************************************!*\
  !*** ./resources/src/components/Sidebar/SidebarMenu.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_SettingsHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/SettingsHelper */ "EyUq");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuItem */ "vkgE");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var SidebarMenu = /** @class */ (function (_super) {
    __extends(SidebarMenu, _super);
    function SidebarMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SidebarMenu.prototype.render = function () {
        var _a;
        var settings = new _utils_SettingsHelper__WEBPACK_IMPORTED_MODULE_5__["SettingsHelper"](this.props.settings.values);
        var schoolName = settings.getValue('school_name');
        var schoolLogo = settings.getValue('school_logo');
        var isAdministrator = this.props.currentUser && this.props.currentUser.details.administrator === true;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar__menu' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'menu_content' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'menu_header' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('menu_header__logo', (_a = {}, _a['--logo'] = schoolLogo, _a)) }, schoolLogo && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "/static/images/logos/" + schoolLogo }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'subtitle1' }, schoolName)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], { location: this.props.routeComponentProps.location },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], { render: function () { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: 'menu_list' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MenuItem__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { to: '/check-in', icon: 'how_to_vote', label: 'Check-in' }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MenuItem__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { to: '/staff', icon: 'supervisor_account', label: 'Staff' }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MenuItem__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { to: '/students', icon: 'face', label: 'Students' }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MenuItem__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { to: '/reporting', icon: 'assessment', label: 'Reporting' }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MenuItem__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { to: '/power-scheduler', icon: 'offline_bolt', label: 'Power Scheduler' }),
                            isAdministrator && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MenuItem__WEBPACK_IMPORTED_MODULE_6__["MenuItem"], { to: '/credentials-manager', icon: 'security', label: 'Credentials Manager' }))))); } })))));
    };
    return SidebarMenu;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    settings: state.settings.items,
    wikiGroups: state.wiki.groups
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, null)(SidebarMenu));


/***/ }),

/***/ "eHEz":
/*!************************************************!*\
  !*** ./resources/src/reducers/staffReducer.ts ***!
  \************************************************/
/*! exports provided: staffReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staffReducer", function() { return staffReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: [],
    item: {}
};
var staffReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STAFF"]:
            return __assign({}, state, { items: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["NEW_STAFF"]:
            return __assign({}, state, { item: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["DELETE_STAFF"]:
            return __assign({}, state, { items: state.items.filter(function (item) { return item.id !== action.payload; }) });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_STAFF"]:
            return __assign({}, state, { items: state.items.filter(function (item) { return item.id !== action.payload.id; }).concat([
                    action.payload
                ]) });
        default:
            return state;
    }
};


/***/ }),

/***/ "ePNl":
/*!*****************************************************************!*\
  !*** ./resources/src/components/Modals/EnhancedDialogTitle.tsx ***!
  \*****************************************************************/
/*! exports provided: EnhancedDialogTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnhancedDialogTitle", function() { return EnhancedDialogTitle; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");



/**
 * An enhanced DialogTitle for material-ui Dialogs.
 * @param children The contents of the DialogTitle (optional)
 * @param className className that gets passed to the container div (optional)
 * @param id id property that gets passed to the container div (optional)
 * @param title The title for the form (optional)
 * @param onClose Optional callback, including which renders a close icon button
 */
var EnhancedDialogTitle = function (props) {
    var _a;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('dialog-title', { '--close-button': props.onClose }, (_a = {}, _a[props.className] = Boolean(props.className), _a)), id: props.id },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'dialog-title__content' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'dialog-title__inner' },
                props.title && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'h6' }, props.title)),
                props.children),
            props.onClose && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Close' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { className: 'icon-close', onClick: function () { return props.onClose(); } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "close"))))),
        props.tabs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tabs"], { className: 'top-nav__tabs', value: props.tabs.value, onChange: props.tabs.onChange, variant: 'fullWidth', indicatorColor: 'primary' }, props.tabs.tabs.map(function (label, index) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tab"], { label: label, key: index })); })))));
};


/***/ }),

/***/ "eYs1":
/*!***************************************************************!*\
  !*** ./resources/src/components/Modals/StudentInfoDialog.tsx ***!
  \***************************************************************/
/*! exports provided: StudentInfoDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentInfoDialog", function() { return StudentInfoDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_swipeable_views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-swipeable-views */ "7VIw");
/* harmony import */ var react_swipeable_views__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_swipeable_views__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _Form_UploadUserForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/UploadUserForm */ "hsRR");
/* harmony import */ var _EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EnhancedDialogTitle */ "ePNl");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var GRADES = [8, 9, 10, 11, 12];
var emptyStudentDetails = {
    id: 0,
    first_name: '',
    last_name: '',
    grade: GRADES[0],
    student_number: null,
    initials: ''
};
var defaultListItems = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Grade', value: 'grade' },
    { label: 'Student Number', value: 'student_number' },
];
var StudentInfoDialog = function (props) {
    // Cast undefined props.edit as boolean; Ensure props.studentDetails aren't empty.
    var edit = props.edit !== false && !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(props.studentDetails);
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(0), tab = _a[0], setTab = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(edit ? props.studentDetails : emptyStudentDetails), details = _b[0], setDetails = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), uploading = _c[0], setUploading = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), errored = _d[0], setErrored = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), userExists = _e[0], setUserExists = _e[1];
    var handleInputChange = function (event) {
        var _a;
        setErrored(false);
        var _b = event.target, name = _b.name, value = _b.value;
        if (name === 'initials') {
            if (value.length > 2) {
                return;
            }
            setDetails(__assign({}, details, { initials: value.toUpperCase() }));
            return;
        }
        if (name === 'student_number') {
            setUserExists(false);
        }
        var firstName = name === 'first_name' ? value : details.first_name;
        var lastName = name === 'last_name' ? value : details.last_name;
        var autoInitials = null;
        if (name === 'first_name' || name === 'last_name') {
            autoInitials = firstName.length > 0 || lastName.length > 0
                ? ("" + firstName.slice(0, 1).trim() + lastName.slice(0, 1).trim()).trim().toUpperCase()
                : '';
        }
        setDetails(__assign({}, details, (_a = {}, _a[name] = value, _a.initials = autoInitials === null ? details.initials : autoInitials, _a)));
    };
    var handleTabChange = function (event, value) {
        setTab(value);
    };
    var handleSubmit = function (event) {
        setUploading(true);
        props.onSubmit(event, details)
            .then(function () {
            setUploading(false);
            props.onClose();
        })
            .catch(function (error) {
            var errorCode = error.response.status;
            setUploading(false);
            switch (errorCode) {
                case 409:
                    setUserExists(true);
                    break;
                default:
                    setErrored(true);
                    break;
            }
        });
    };
    var navTabs = {
        value: tab,
        onChange: handleTabChange,
        tabs: ['Single', 'File Upload']
    };
    var SingleForm = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: 'dialog-form', onSubmit: handleSubmit, autoComplete: 'off' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'dialog-form__row' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'last_name', label: 'Last Name', value: details.last_name, onChange: handleInputChange, className: 'text-field', required: true, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'first_name', label: 'First Name', value: details.first_name, onChange: handleInputChange, className: 'text-field', required: true, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'dialog-form__row' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'initials', label: 'Initials', value: details.initials, onChange: handleInputChange, className: 'text-field', required: true, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' }),
                !edit && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'student_number', label: 'Student Number', value: details.student_number, onChange: handleInputChange, className: 'text-field', required: true, error: userExists, helperText: userExists ? 'A student with this student number already exists.' : undefined, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'grade', id: 'grade', select: true, variant: 'outlined', label: 'Grade', margin: 'normal', fullWidth: true, onChange: handleInputChange, value: details.grade, required: true }, GRADES.map(function (grade) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { value: grade, key: grade }, "Grade " + grade)); }))),
            errored && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'subtitle1', color: 'error' }, "Something went wrong. Please try again.")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_4__["LoadingButton"], { loading: uploading, variant: 'contained', color: 'primary', type: 'submit' }, edit ? 'Update' : 'Add Student')))));
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: props.open, scroll: 'paper', "aria-labelledby": 'student-dialog-title' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_6__["EnhancedDialogTitle"], { id: 'student-dialog-title', onClose: props.onClose, tabs: !edit && navTabs, title: props.edit ? 'Edit Student' : 'Add Student' }),
        edit ? SingleForm : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_swipeable_views__WEBPACK_IMPORTED_MODULE_1___default.a, { index: navTabs.value },
            SingleForm,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_UploadUserForm__WEBPACK_IMPORTED_MODULE_5__["UploadUserForm"], { onClose: props.onClose, headers: defaultListItems, userType: 'student' })))));
};


/***/ }),

/***/ "elSr":
/*!*************************************************!*\
  !*** ./resources/src/components/StarButton.tsx ***!
  \*************************************************/
/*! exports provided: StarButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarButton", function() { return StarButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _material_ui_icons_StarBorderRounded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/StarBorderRounded */ "roQC");
/* harmony import */ var _material_ui_icons_StarBorderRounded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_StarBorderRounded__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_StarRounded__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/StarRounded */ "zfZ/");
/* harmony import */ var _material_ui_icons_StarRounded__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_StarRounded__WEBPACK_IMPORTED_MODULE_3__);




var StarButton = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { onClick: function () { return props.onClick(); }, disabled: props.disabled }, props.isStarred ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_StarRounded__WEBPACK_IMPORTED_MODULE_3___default.a, { className: '--starred' })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_StarBorderRounded__WEBPACK_IMPORTED_MODULE_2___default.a, null))));
};


/***/ }),

/***/ "fvG4":
/*!*************************************************!*\
  !*** ./resources/src/reducers/reportReducer.ts ***!
  \*************************************************/
/*! exports provided: reportReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportReducer", function() { return reportReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: [],
    item: {}
};
var reportReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_REPORTS"]:
            return __assign({}, state, { items: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["CREATE_REPORT"]:
            return __assign({}, state, { items: [action.payload].concat(state.items), item: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_REPORT"]:
            return __assign({}, state, { items: state.items.reduce(function (acc, item, index) {
                    acc.push(item.id === action.payload.id ? action.payload : item);
                    return acc;
                }, []), item: action.payload });
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["DELETE_REPORT"]:
            return __assign({}, state, { items: state.items.filter(function (item) {
                    return item.id !== action.payload.id;
                }), item: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "gWuD":
/*!*****************************************************************!*\
  !*** ./resources/src/components/Calendar/CancelAppointment.tsx ***!
  \*****************************************************************/
/*! exports provided: CancelAppointment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelAppointment", function() { return CancelAppointment; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");



var CancelAppointment = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), loading = _a[0], setLoading = _a[1];
    var handleSubmit = function () {
        setLoading(true);
        props.onSubmit(props.appointment)
            .then(function (res) {
            setLoading(false);
            props.onClose();
        })
            .catch(function (error) {
            setLoading(false);
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, "Delete Appointment"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null, props.appointment ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, "The following appointment will be deleted:"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_item' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", { className: 'calendar_item__title' }, props.appointment.staff.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'calendar__memo' }, props.appointment.memo)))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, "Are you sure you want to delete the appointment?"))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_2__["LoadingButton"], { loading: loading, variant: 'text', color: 'primary', onClick: function () { return handleSubmit(); } }, "Confirm"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"))));
};


/***/ }),

/***/ "hsRR":
/*!**********************************************************!*\
  !*** ./resources/src/components/Form/UploadUserForm.tsx ***!
  \**********************************************************/
/*! exports provided: UploadUserForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadUserForm", function() { return UploadUserForm; });
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! filepond/dist/filepond.min.css */ "TtPJ");
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_filepond__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-filepond */ "aTGW");
/* harmony import */ var react_filepond__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_filepond__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/storage */ "k83H");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _Modals_ConfirmPasswordDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Modals/ConfirmPasswordDialog */ "Vdut");







var UploadUserForm = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(0), step = _a[0], setStep = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState([]), files = _b[0], setFiles = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(props.headers), listItems = _c[0], setListItems = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false), uploading = _d[0], setUploading = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false), passwordDialogOpen = _e[0], setPasswordDialogOpen = _e[1];
    var FilePond = react_filepond__WEBPACK_IMPORTED_MODULE_2__["FilePond"];
    var swapIndices = function (previous, next) {
        if (previous === next
            || previous > listItems.length - 1
            || next > listItems.length - 1
            || previous < 0
            || next < 0) {
            return;
        }
        var newListItems = listItems.slice();
        newListItems[previous] = listItems[next];
        newListItems[next] = listItems[previous];
        setListItems(newListItems);
    };
    var handleFileChange = function (fileItems) {
        setFiles(fileItems.map(function (fileItem) { return fileItem.file; }));
    };
    var handleFileUpload = function (password) {
        setUploading(true);
        var headers = listItems.map(function (listItem) { return (listItem.value); });
        try {
            Object(_utils_storage__WEBPACK_IMPORTED_MODULE_4__["uploadCSV"])(files.map(function (file) { return file; }), headers, props.userType, password)
                .then(function () {
                setUploading(false);
                setFiles([]);
                setStep(3);
            });
        }
        catch (error) {
            setUploading(false);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_ConfirmPasswordDialog__WEBPACK_IMPORTED_MODULE_6__["ConfirmPasswordDialog"], { open: passwordDialogOpen, onSubmit: function (password) { return handleFileUpload(password); }, onClose: function () { return setPasswordDialogOpen(false); }, actionItems: ['Upload user CSV files'] }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Stepper"], { activeStep: step, orientation: 'vertical' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Step"], { key: 0 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepLabel"], null, "Choose Files"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepContent"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Select up to five CSV files to create Student accounts. Ensure that all files have identical column ordering."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FilePond, { files: files, onupdatefiles: handleFileChange, allowMultiple: true, maxFiles: 5 }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'stepper-actions' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { disabled: files.length === 0, onClick: function () { return setStep(1); }, variant: 'contained', color: 'primary' }, "Next")))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Step"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepLabel"], null, "Field Order"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepContent"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Order the list of fields below as they appear in the CSV file columns."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["List"], null, listItems.map(function (listItem, index) {
                            var spanStyle = {
                                color: 'rgba(0,0,0,0.48)',
                                marginRight: 16,
                                fontWeight: 500,
                                fontVariantNumeric: 'tabular-nums'
                            };
                            var buttonUp = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: function () { return swapIndices(index, index - 1); }, disabled: index <= 0 },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "expand_less")));
                            var buttonDown = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { onClick: function () { return swapIndices(index, index + 1); }, disabled: index >= listItems.length - 1 },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Icon"], null, "expand_more")));
                            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItem"], { key: index },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { style: spanStyle }, index + 1),
                                listItem.label,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemSecondaryAction"], null,
                                    index >= 0 ? buttonUp : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Move Up' }, buttonUp),
                                    index >= listItems.length - 1 ? (buttonDown) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { title: 'Move Down' }, buttonDown)))));
                        })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'stepper-actions' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: function () { return setStep(0); }, variant: 'text' }, "Back"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: function () { return setStep(2); }, variant: 'contained', color: 'primary' }, "Next")))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Step"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepLabel"], null, "Submit Files"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepContent"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                            "When you're ready, click ",
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { style: { fontWeight: 500 } }, "Upload"),
                            " to send your CSV files."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'stepper-actions' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: function () { return setStep(1); }, variant: 'text' }, "Back"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_5__["LoadingButton"], { onClick: function () { return setPasswordDialogOpen(true); }, variant: 'contained', color: 'primary', loading: uploading }, "Upload")))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Step"], { completed: step >= 3 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepLabel"], null, "Done"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["StepContent"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "All done! We'll take it from here. You'll receive a notification once all CSVs have been processed."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["DialogActions"], null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: function () { return setStep(0); }, variant: 'contained', color: 'primary' }, "Add More"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: function () { return props.onClose(); }, variant: 'text' }, "Close"))))))));
};


/***/ }),

/***/ "iTBj":
/*!*************************************************!*\
  !*** ./resources/src/components/App/Splash.tsx ***!
  \*************************************************/
/*! exports provided: Splash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Splash", function() { return Splash; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _LoadingBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoadingBadge */ "boiz");



var Splash = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'splash', id: 'splash' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Fade"], { in: props.in, unmountOnExit: true },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'splash__inner' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'splash__content' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoadingBadge__WEBPACK_IMPORTED_MODULE_2__["default"], null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Fade"], { in: props.showChildren },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { className: 'splash__image_logo', src: '/static/images/ft-badge.png' }),
                            props.children)))))));
};


/***/ }),

/***/ "iea3":
/*!*****************************************************!*\
  !*** ./resources/src/components/EmptyStateIcon.tsx ***!
  \*****************************************************/
/*! exports provided: EmptyStateIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyStateIcon", function() { return EmptyStateIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Empty state icon template for widgets and tables.
 * @param variant The filename of the desired icon.
 * @param children Text for the EmptyStateIcon.
 */
var EmptyStateIcon = function (props) {
    var imageName = "url('/static/images/empty-state/" + props.variant + ".svg')";
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'empty-state-icon' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'empty-state-icon__image', style: { backgroundImage: imageName } }),
        props.children));
};


/***/ }),

/***/ "jRkZ":
/*!******************************************************!*\
  !*** ./resources/src/components/Sidebar/Sidebar.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "DfQ9");
/* harmony import */ var _AccountWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AccountWidget */ "9wca");
/* harmony import */ var _HelpWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HelpWidget */ "diR5");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavItem */ "LBOG");
/* harmony import */ var _NotificationsWidget_NotificationsWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NotificationsWidget/NotificationsWidget */ "kh08");
/* harmony import */ var _SearchWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SearchWidget */ "M3bm");
/* harmony import */ var _SidebarMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SidebarMenu */ "e6C1");
/* harmony import */ var _StarredWidget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StarredWidget */ "3a2C");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();










var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sidebar.prototype.render = function () {
        var _this = this;
        var style = {
            backgroundColor: this.props.theme.palette.primary.main
        };
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'sidebar' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", { className: 'sidebar__nav', style: style },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'nav_top' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { onClick: function () { return _this.props.onToggleMenuOpen(); } },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], null, "menu")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchWidget__WEBPACK_IMPORTED_MODULE_7__["SearchWidget"], null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StarredWidget__WEBPACK_IMPORTED_MODULE_9__["default"], null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavItem__WEBPACK_IMPORTED_MODULE_5__["NavItem"], { title: 'Check-in', icon: 'how_to_reg', badgeCount: 0, to: 'check-in' })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'nav_bottom' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NotificationsWidget_NotificationsWidget__WEBPACK_IMPORTED_MODULE_6__["default"], null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HelpWidget__WEBPACK_IMPORTED_MODULE_4__["HelpWidget"], null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AccountWidget__WEBPACK_IMPORTED_MODULE_3__["default"], { onSignOut: this.props.onSignOut }))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SidebarMenu__WEBPACK_IMPORTED_MODULE_8__["default"], { routeComponentProps: this.props.routeComponentProps })));
    };
    return Sidebar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withTheme"])(Sidebar));


/***/ }),

/***/ "k3uG":
/*!*************************************************************!*\
  !*** ./resources/src/components/Calendar/CalendarBlock.tsx ***!
  \*************************************************************/
/*! exports provided: CalendarBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarBlock", function() { return CalendarBlock; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");



var CalendarBlock = function (props) {
    var _a, _b;
    var memo = props.memo, title = props.title, variant = props.variant, badgeCount = props.badgeCount, voided = props.voided;
    var label = props.details.label;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Badge"], { badgeContent: badgeCount, invisible: badgeCount === 0, color: 'secondary', max: 9, className: 'block__badge' },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Card"], { className: 'block' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardActionArea"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('block__inner', (_a = {}, _a["--" + variant] = variant, _a), (_b = {}, _b['--void'] = voided, _b)), onClick: function () { return props.onClick(props.details); } },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardContent"], { className: 'block__content' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h6", { className: 'block__label' }, label || 'No Label'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'block__title' }, title),
                    memo && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'block__memo' }, memo)))))));
};


/***/ }),

/***/ "k83H":
/*!****************************************!*\
  !*** ./resources/src/utils/storage.ts ***!
  \****************************************/
/*! exports provided: uploadCSV, writeObjectToLocalStorage, appendToLocalStorageArray, getObjectFromLocalStorage, ACCESS_TOKEN, CHECK_IN_ERRORS, MENU_OPEN, REMEMBER_USERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadCSV", function() { return uploadCSV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeObjectToLocalStorage", function() { return writeObjectToLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendToLocalStorageArray", function() { return appendToLocalStorageArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObjectFromLocalStorage", function() { return getObjectFromLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCESS_TOKEN", function() { return ACCESS_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_IN_ERRORS", function() { return CHECK_IN_ERRORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_OPEN", function() { return MENU_OPEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMEMBER_USERS", function() { return REMEMBER_USERS; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "2bo5");


/**
 * Recursively uploads staff or student CSV files to the server.
 * @param files Files to upload.
 * @param headers The ordered CSV headers.
 * @param userType Either 'student' or 'staff'.
 * @throws Errors if unable to post files.
 */
var uploadCSV = function (files, headers, userType, password) {
    if (files.length === 0) {
        return;
    }
    var url = userType === 'student'
        ? '/api/students/upload'
        : '/api/staff/upload';
    var file = files.pop();
    var formData = new FormData();
    formData.append('file', file);
    formData.append('headers', headers.join(','));
    formData.append('password', password);
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, formData)
        .then(function () {
        uploadCSV(files, headers, userType, password);
    })
        .catch(function (reason) {
        throw new Error('Unable to upload files. ' + reason);
    });
};
/**
 * Writes a plain JavaScript object to localStorage, which can only store strings.
 * @param key The localStorage key.
 * @param object The object to write.
 */
var writeObjectToLocalStorage = function (key, object) {
    var json = JSON.stringify(object);
    localStorage.setItem(key, json);
};
/**
 * Appends an object to another object that is currently in localStorage.
 * If the object in localStorage isn't currently an array, it is made into
 * and array, and the given object is then appended to it.
 * @param key The key of the object.
 * @param object The object to append.
 */
var appendToLocalStorageArray = function (key, object) {
    var array = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["makeArray"])(getObjectFromLocalStorage(key));
    array.push(object);
    writeObjectToLocalStorage(key, array);
};
/**
 * Retrieves a plain JavaScript object from localStorage which is stored as a string.
 * @param key The key of the localStorage string to retreive
 */
var getObjectFromLocalStorage = function (key) {
    var json = localStorage.getItem(key);
    return JSON.parse(json);
};
// localStorage keys
var ACCESS_TOKEN = 'ACCESS_TOKEN';
var CHECK_IN_ERRORS = 'CHECK_IN_ERRORS';
var MENU_OPEN = 'MENU_OPEN';
var REMEMBER_USERS = 'REMEMBER_USERS';


/***/ }),

/***/ "k8mV":
/*!*************************************************************!*\
  !*** ./resources/src/components/Reporting/ReportEditor.tsx ***!
  \*************************************************************/
/*! exports provided: ReportEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportEditor", function() { return ReportEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/report */ "G75r");
/* harmony import */ var _DateWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DateWidget */ "T0Q2");
/* harmony import */ var _ReportNameWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReportNameWidget */ "4XmI");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ReportEditor = /** @class */ (function (_super) {
    __extends(ReportEditor, _super);
    function ReportEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChangeName = function (name) {
            _this.props.onUpdateReport({ name: name });
        };
        return _this;
    }
    ReportEditor.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'report', id: 'report' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'report__header' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'header_info' }, this.props.loading ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { width: 200, height: 70 } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_1__["default"], { width: 200, height: 70 },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: 0, y: 0, rx: 4, ry: 4, height: 14, width: 160 }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: 0, y: 32, rx: 4, ry: 4, height: 38, width: 200 })))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'overline' }, this.props.variantDetails.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportNameWidget__WEBPACK_IMPORTED_MODULE_5__["ReportNameWidget"], { name: this.props.report.name || _utils_report__WEBPACK_IMPORTED_MODULE_3__["REPORT_PLACEHOLDER_NAME"], onSubmit: this.handleChangeName })))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'header_actions' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateWidget__WEBPACK_IMPORTED_MODULE_4__["DateWidget"], { dateRange: this.props.report.date_range, segment: this.props.report.segment, onUpdateReport: this.props.onUpdateReport, disabled: this.props.loading }))))));
    };
    return ReportEditor;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));



/***/ }),

/***/ "kFjw":
/*!*****************************************************!*\
  !*** ./resources/src/components/SelectableList.tsx ***!
  \*****************************************************/
/*! exports provided: SelectableList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectableList", function() { return SelectableList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form/LoadingIconButton */ "x2q7");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SelectableList = /** @class */ (function (_super) {
    __extends(SelectableList, _super);
    function SelectableList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sortingActive: false,
            sortingOrder: 'desc',
            loadingActions: []
        };
        _this.handleSort = function () {
            _this.setState({ sortingActive: true });
        };
        _this.toggleSort = function () {
            _this.setState(function (state) { return ({
                sortingOrder: state.sortingOrder === 'asc' ? 'desc' : 'asc'
            }); });
        };
        _this.setActionLoading = function (index) {
            _this.setState(function (state) { return ({
                loadingActions: state.loadingActions.concat([index])
            }); });
        };
        _this.unsetActionLoading = function (index) {
            _this.setState(function (state) { return ({
                loadingActions: state.loadingActions.filter(function (actionIndex) { return actionIndex !== index; })
            }); });
        };
        _this.handleCallback = function (callback, index) {
            _this.setActionLoading(index);
            callback(_this.props.selected)
                .then(function () {
                _this.unsetActionLoading(index);
            })
                .catch(function () {
                _this.unsetActionLoading(index);
            });
        };
        _this.handleClick = function (item, selected) {
            if (_this.isLoading()) {
                return;
            }
            _this.props.onToggleSelected(item.id, !selected);
        };
        _this.handleSelectAll = function () {
            if (_this.isLoading()) {
                return;
            }
            _this.props.onSelectAll();
        };
        _this.isLoading = function () {
            return _this.state.loadingActions.length > 0;
        };
        return _this;
    }
    SelectableList.prototype.render = function () {
        var _this = this;
        var _a = this.props, actions = _a.actions, items = _a.items, selected = _a.selected, sortable = _a.sortable, sortLabel = _a.sortLabel, title = _a.title;
        var allSelected = items.length === selected.length;
        var isLoading = this.isLoading();
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'selectable-list' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'selectable-list__header' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'selectable-list__title' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { indeterminate: selected.length > 0 && !allSelected, checked: allSelected, onChange: function () { return _this.handleSelectAll(); }, color: 'primary' }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'h6' }, title)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Fade"], { in: selected.length > 0 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'selectable-list__actions' }, actions.map(function (action, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], { title: action.title },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingIconButton__WEBPACK_IMPORTED_MODULE_2__["LoadingIconButton"], { onClick: function () { return _this.handleCallback(action.callback, index); }, loading: _this.state.loadingActions.indexOf(index) !== -1 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], null, action.icon)))); })))),
            isLoading ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["LinearProgress"], null) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Divider"], null),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["List"], { className: 'selectable-list__list' }, items.map(function (item) {
                var isSelected = _this.props.selected.indexOf(item.id) !== -1;
                return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["ListItem"], { disabled: isLoading, dense: true, button: true, disableRipple: true, onClick: function () { return _this.handleClick(item, isSelected); }, key: item.id },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["ListItemIcon"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { color: 'primary', edge: 'start', checked: isSelected, tabIndex: -1 })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["ListItemText"], { primary: item.label })));
            }))));
    };
    return SelectableList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));



/***/ }),

/***/ "kh08":
/*!**************************************************************************************!*\
  !*** ./resources/src/components/Sidebar/NotificationsWidget/NotificationsWidget.tsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions/notificationsActions */ "dPHG");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../EmptyStateIcon */ "iea3");
/* harmony import */ var _Modals_ConfirmationDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Modals/ConfirmationDialog */ "tlAg");
/* harmony import */ var _Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Sidebar/NavItem */ "LBOG");
/* harmony import */ var _NotificationDispatchWidget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NotificationDispatchWidget */ "VO18");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};











var NotificationsTab = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["withStyles"])({
    root: { minWidth: 'unset' }
})(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tab"]);
var NotificationsWidget = /** @class */ (function (_super) {
    __extends(NotificationsWidget, _super);
    function NotificationsWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            archiveAllDialogOpen: false,
            loadingInbox: false,
            loadingOutbox: false,
            open: false,
            openNotifications: [],
            sendFormOpen: false,
            snackbars: [],
            tab: 0
        };
        _this.contentLoader = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'items_modal__content-loader' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { width: 500, height: 436 },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '44', y: '44', rx: '4', ry: '4', height: '18', width: '348' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '420', y: '44', rx: '48', ry: '48', height: '48', width: '48' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '44', y: '72', rx: '4', ry: '4', height: '18', width: '86' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '44', y: '116', rx: '4', ry: '4', height: '18', width: '348' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '420', y: '116', rx: '48', ry: '48', height: '48', width: '48' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '44', y: '144', rx: '4', ry: '4', height: '18', width: '112' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '44', y: '188', rx: '4', ry: '4', height: '18', width: '348' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '420', y: '188', rx: '48', ry: '48', height: '48', width: '48' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: '44', y: '216', rx: '4', ry: '4', height: '18', width: '64' }))));
        _this.handleClickOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        _this.escFunction = function (event) {
            if (event.keyCode === 27) {
                _this.setState({ open: false });
            }
        };
        _this.handleInboxClick = function (item) {
            var notification = item.notification, read = item.read;
            _this.handleToggleNotificationOpen(notification);
            if (!read) {
                _this.handleMarkRead(notification);
            }
        };
        _this.handleToggleNotificationOpen = function (notification) {
            if (_this.state.openNotifications.indexOf(notification.id) >= 0) {
                // Notification is open
                _this.handleCloseNotification(notification.id);
            }
            else {
                // Notification is closed
                _this.handleOpenNotification(notification.id);
            }
        };
        _this.handleCloseNotification = function (id) {
            _this.setState(function (state) {
                return __assign({}, state, { openNotifications: state.openNotifications.filter(function (notificationID) {
                        return notificationID !== id;
                    }) });
            });
        };
        _this.handleOpenNotification = function (id) {
            _this.setState(function (state) {
                return __assign({}, state, { openNotifications: state.openNotifications.concat([id]) });
            });
        };
        _this.refreshInbox = function () {
            _this.props.fetchNotificationInbox();
        };
        _this.handleArchive = function (notification) {
            _this.props.archiveNotification(notification);
            _this.handleCloseNotification(notification.id);
            _this.props.queueSnackbar({
                message: 'Archived 1 message.',
                buttons: [
                    { value: 'Undo', callback: function () { return _this.handleUnarchive(notification); } }
                ]
            });
        };
        _this.handleUnarchive = function (notification) {
            _this.props.unarchiveNotification(notification);
            _this.props.queueSnackbar({
                message: 'Unarchived 1 message.'
            });
        };
        _this.handleMarkRead = function (notification) {
            _this.props.markNotificationAsRead(notification);
        };
        _this.handleMarkUnread = function (notification) {
            _this.handleCloseNotification(notification.id);
            _this.props.markNotificationAsUnread(notification);
        };
        _this.handleArchiveAll = function () {
            _this.setState({ archiveAllDialogOpen: true });
        };
        _this.handleArchiveAllDialogClose = function () {
            _this.setState({ archiveAllDialogOpen: false });
        };
        _this.onArchiveAll = function () {
            _this.props.archiveAllNotifications();
            _this.props.queueSnackbar({ message: 'Archived all messages.' });
            _this.setState({ openNotifications: [] });
            return new Promise(function (resolve, reject) {
                resolve();
            });
        };
        _this.handleMarkAllRead = function () {
            _this.props.markAllNotificationsAsRead();
        };
        _this.handleTabChange = function (tab) {
            _this.setState({ tab: tab });
        };
        _this.handleOpenSendForm = function () {
            _this.setState({ sendFormOpen: true });
        };
        _this.handleCloseSendForm = function () {
            _this.setState({ sendFormOpen: false });
        };
        _this.handleSendNotification = function () {
            //
        };
        _this.escFunction = _this.escFunction.bind(_this);
        return _this;
    }
    NotificationsWidget.prototype.componentDidMount = function () {
        var _this = this;
        // Add event listener for escape key press
        document.addEventListener('keydown', this.escFunction, false);
        // Create polling interval (10 seconds for administrators, 30 seconds otherwise)
        this.timer = window.setInterval(function () { return _this.refreshInbox(); }, this.props.currentUser && this.props.currentUser.details.administrator ? 10000 : 30000);
        // Fetch Notifications
        this.setState({ loadingInbox: true, loadingOutbox: true });
        this.props.fetchNotificationInbox().then(function (res) {
            _this.setState({ loadingInbox: false });
        });
        this.props.fetchNotificationOutbox().then(function (res) {
            _this.setState({ loadingOutbox: false });
        });
    };
    NotificationsWidget.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.escFunction, false);
        // Clear polling timer
        clearInterval(this.timer);
        this.timer = null;
    };
    NotificationsWidget.prototype.componentDidUpdate = function (previousProps) {
        var _this = this;
        if (this.state.loadingInbox || this.state.loadingOutbox || !this.props.inbox || !previousProps.inbox) {
            return;
        }
        var currentNotifications = previousProps.inbox;
        var newNotifications = this.props.inbox.filter(function (item) {
            // Collect all notifications that aren't in previous props
            return currentNotifications.every(function (currentNotification) {
                return currentNotification.notification.id !== item.notification.id && item.read === false;
            });
        });
        if (newNotifications.length === 0) {
            return;
        }
        var showNotificationButton = function (id) { return ({
            value: 'Read More',
            callback: function () {
                _this.handleClickOpen();
                if (id) {
                    window.setTimeout(function () {
                        _this.handleOpenNotification(id);
                    }, 300);
                }
            }
        }); };
        this.props.queueSnackbar(newNotifications.length === 1 ? ({
            message: newNotifications[0].notification.body,
            buttons: [showNotificationButton(newNotifications[0].notification.id)]
        }) : ({
            message: "You have " + newNotifications.length + " new notifications.",
            buttons: [showNotificationButton()]
        }));
    };
    NotificationsWidget.prototype.render = function () {
        var _this = this;
        var unreadCount = this.props.inbox ? this.props.inbox.filter(function (notification) {
            return notification.read === false;
        }).length : 0;
        var disableActions = !(this.props.inbox && this.props.inbox.length > 0);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Sidebar_NavItem__WEBPACK_IMPORTED_MODULE_9__["NavItem"], { title: 'Notifications', icon: 'notifications', badgeCount: unreadCount, onClick: this.handleClickOpen }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Drawer"], { open: this.state.open },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal notifications_modal items_modal' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal__header' },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { className: 'button_back', onClick: this.handleClose },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "arrow_back")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Notifications")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tabs"], { value: this.state.tab, indicatorColor: 'primary', onChange: function (event, value) { return _this.handleTabChange(value); } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(NotificationsTab, { label: 'Inbox', value: 0 }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(NotificationsTab, { label: 'Sent', value: 1 }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'sidebar_modal__content items_modal__content' },
                        this.state.tab === 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'notifications_modal__actions' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { disabled: disableActions || unreadCount === 0, onClick: function () { return _this.handleMarkAllRead(); } }, "Mark " + (unreadCount > 0 ? unreadCount : 'all') + " as read"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { disabled: disableActions, onClick: function () { return _this.handleArchiveAll(); } }, "Archive all")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Fade"], { in: this.state.loadingInbox }, this.contentLoader),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Grow"], { in: this.props.inbox && this.props.inbox.length > 0 },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'content-inner' }, this.props.inbox.map(function (item) {
                                    var _a;
                                    var notification = item.notification;
                                    var expanded = _this.state.openNotifications.indexOf(notification.id) !== -1;
                                    var read = expanded || item.read;
                                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanel"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('notification', (_a = {}, _a['--read'] = read, _a)), expanded: expanded, key: notification.id },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanelSummary"], { expandIcon: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "expand_more"), onClick: function () { return _this.handleInboxClick(item); } },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'notification__info' }, expanded ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'header' }, notification.date),
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'time' }, notification.time))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'header' },
                                                    !read && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: 'unread-badge' }),
                                                    notification.body),
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'time' }, notification.approximateTime))))),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanelDetails"], null,
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, notification.body)),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanelActions"], null,
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { onClick: function () { return _this.handleMarkUnread(notification); } }, "Mark Unread"),
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { onClick: function () { return _this.handleArchive(notification); } }, "Archive"))));
                                }))),
                            (!this.state.loadingInbox && this.props.inbox.length === 0) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_7__["EmptyStateIcon"], { variant: 'notifications' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Your inbox is empty"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Notifications that you receive from Spotlight will appear here."))))),
                        this.state.tab === 1 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            !this.state.sendFormOpen && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'notifications_modal__actions' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'text', color: 'primary', onClick: function () { return _this.handleOpenSendForm(); } }, "Compose"))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Fade"], { in: this.state.loadingInbox }, this.contentLoader),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Grow"], { in: this.props.outbox && this.props.outbox.length > 0 },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'content-inner' }, this.props.outbox.map(function (item) {
                                    var notification = item.notification;
                                    var expanded = _this.state.openNotifications.indexOf(notification.id) >= 0;
                                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanel"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('notification', '--read'), expanded: expanded, key: notification.id },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanelSummary"], { expandIcon: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "expand_more"), onClick: function () { return _this.handleToggleNotificationOpen(notification); } },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'notification__info' }, expanded ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'header' }, notification.date),
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'time' }, notification.time))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'header' }, notification.body),
                                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: 'time' }, notification.approximateTime))))),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanelDetails"], null,
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, notification.body)),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ExpansionPanelActions"], null,
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { onClick: function () { return _this.handleMarkUnread(notification); } }, "Mark Unread"),
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { onClick: function () { return _this.handleArchive(notification); } }, "Archive"))));
                                }))),
                            this.state.sendFormOpen && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_NotificationDispatchWidget__WEBPACK_IMPORTED_MODULE_10__["default"], { onCancel: this.handleCloseSendForm, onSubmit: this.handleSendNotification })),
                            (!this.state.loadingOutbox && this.props.outbox.length === 0 && !this.state.sendFormOpen) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_7__["EmptyStateIcon"], { variant: 'notifications' },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Your outbox is empty"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Notifications that you send from Spotlight will appear here.")))))))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Modals_ConfirmationDialog__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialog"], { open: this.state.archiveAllDialogOpen, bodyText: 'Are you sure you want to archive all Notifications? This action cannot be undone.', title: 'Archive all Notifications', onClose: this.handleArchiveAllDialogClose, onSubmit: this.onArchiveAll })));
    };
    return NotificationsWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    inbox: state.notifications.inbox,
    outbox: state.notifications.outbox
}); };
var mapDispatchToProps = {
    archiveAllNotifications: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["archiveAllNotifications"],
    archiveNotification: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["archiveNotification"],
    fetchNotificationInbox: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["fetchNotificationInbox"],
    fetchNotificationOutbox: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["fetchNotificationOutbox"],
    markAllNotificationsAsRead: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["markAllNotificationsAsRead"],
    markNotificationAsRead: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["markNotificationAsRead"],
    markNotificationAsUnread: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["markNotificationAsUnread"],
    sendNotification: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["sendNotification"],
    unarchiveNotification: _actions_notificationsActions__WEBPACK_IMPORTED_MODULE_5__["unarchiveNotification"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_6__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(NotificationsWidget));


/***/ }),

/***/ "kvhC":
/*!******************************************************************!*\
  !*** ./resources/src/components/CheckIn/ConfirmDeleteDialog.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var ConfirmDeleteDialog = function (props) {
    var handleSubmit = function () {
        props.onSubmit();
        props.onClose();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, "Remove All"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, "Are you sure you'd like to remove all entered student numbers?"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: function () { return props.onClose(); } }, "Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { color: 'primary', onClick: function () { return handleSubmit(); } }, "Delete")))));
};
/* harmony default export */ __webpack_exports__["default"] = (ConfirmDeleteDialog);


/***/ }),

/***/ "lI+E":
/*!*********************************!*\
  !*** ./resources/src/index.tsx ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/styles */ "04ZO");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "oaXt");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./theme */ "TQGL");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/api */ "B/6j");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/storage */ "k83H");
/* harmony import */ var _components_App_AppWithAuth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/App/AppWithAuth */ "+Aij");









Object(_utils_api__WEBPACK_IMPORTED_MODULE_6__["setAuthorizationToken"])(localStorage.getItem(_utils_storage__WEBPACK_IMPORTED_MODULE_7__["ACCESS_TOKEN"]));
Object(_utils_api__WEBPACK_IMPORTED_MODULE_6__["setJsonHeaders"])();
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_styles__WEBPACK_IMPORTED_MODULE_3__["ThemeProvider"], { theme: _theme__WEBPACK_IMPORTED_MODULE_5__["theme"] },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], { store: _store__WEBPACK_IMPORTED_MODULE_4__["store"] },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App_AppWithAuth__WEBPACK_IMPORTED_MODULE_8__["default"], null))), document.getElementById('app-root'));


/***/ }),

/***/ "msBc":
/*!*******************************************************************!*\
  !*** ./resources/src/components/Reporting/ReportUnsavedModal.tsx ***!
  \*******************************************************************/
/*! exports provided: ReportUnsavedModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportUnsavedModal", function() { return ReportUnsavedModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var ReportUnsavedModal = function (props) {
    var handleSubmit = function () {
        props.onClose();
        props.onSubmit();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], null, "Unsaved Report"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null, "Are you sure you want to replace this Report?")),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', color: 'primary', onClick: function () { return handleSubmit(); } }, "Okay"))));
};



/***/ }),

/***/ "oaXt":
/*!********************************!*\
  !*** ./resources/src/store.ts ***!
  \********************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "ANjH");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "sINF");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ "E2nk");



var initialState = {};
var middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"]];
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_0__["compose"];
var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_2__["rootReducer"], 
// initialState,
composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(void 0, middleware)));


/***/ }),

/***/ "pbD8":
/*!*********************************************************!*\
  !*** ./resources/src/reducers/studentProfileReducer.ts ***!
  \*********************************************************/
/*! exports provided: studentProfileReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "studentProfileReducer", function() { return studentProfileReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    student: {}
};
var studentProfileReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STUDENT_PROFILE"]:
            return __assign({}, state, { student: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "qDVX":
/*!***********************************************************!*\
  !*** ./resources/src/components/Banner/BannerContent.tsx ***!
  \***********************************************************/
/*! exports provided: BannerContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerContent", function() { return BannerContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var BannerContent = function (props) {
    var handleClick = function (callback) {
        props.onClose();
        callback();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'banner__content' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'banner__message' },
            props.icon && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Avatar"], { className: 'banner__avatar' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], null, props.icon))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], null, props.message)),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'banner__actions' },
            props.actions && props.actions.map(function (action, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { key: index, variant: 'text', color: 'primary', onClick: function () { return handleClick(action.callback); } }, action.text)); }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', color: 'primary', onClick: function () { return props.onClose(); } }, "Close"))));
};



/***/ }),

/***/ "qcP7":
/*!*********************************************!*\
  !*** ./resources/src/components/TopNav.tsx ***!
  \*********************************************/
/*! exports provided: TopNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopNav", function() { return TopNav; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "GRpk");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");





var TopNav = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('top-nav', props.className) },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'top-nav__inner' },
                (props.breadcrumbs && props.breadcrumbs.length) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Breadcrumbs"], null,
                    props.breadcrumbs.slice(0, props.breadcrumbs.length - 1)
                        .map(function (link) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: link.to, key: link.to },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'h6', color: 'inherit' }, link.value))); }),
                    props.loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { width: 100, height: 32 } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], { width: 100, height: 32 },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: 0, y: 0, rx: 4, ry: 4, height: 32, width: 100 })))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'h6', color: 'textPrimary' }, props.breadcrumbs[props.breadcrumbs.length - 1].value)))),
                props.children,
                props.actions && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'top-nav__actions' }, props.actions))),
            props.tabs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tabs"], { className: 'top-nav__tabs', value: props.tabs.value, onChange: props.tabs.onChange, variant: 'fullWidth', indicatorColor: 'primary' }, props.tabs.tabs.map(function (label) {
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tab"], { label: label });
            }))))));
};


/***/ }),

/***/ "rzMi":
/*!******************************************************!*\
  !*** ./resources/src/reducers/staffTopicsReducer.ts ***!
  \******************************************************/
/*! exports provided: staffTopicsReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staffTopicsReducer", function() { return staffTopicsReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    items: [],
    item: null
};
var staffTopicsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STAFF_LIST"]:
            return __assign({}, state, { items: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "tDxb":
/*!************************************************************!*\
  !*** ./resources/src/components/Modals/AboutSpotlight.tsx ***!
  \************************************************************/
/*! exports provided: AboutSpotlight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutSpotlight", function() { return AboutSpotlight; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");


var AboutSpotlight = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: props.open },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'about-spotlight' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'about-spotlight__logo' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'h4', className: 'about-spotlight__name' }, "Spotlight"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'subtitle1', className: 'about-spotlight__version' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Version "),
                    "1.2.9"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { variant: 'subtitle2' }, "By Focustime Technologies"))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Close"))));
};


/***/ }),

/***/ "tlAg":
/*!****************************************************************!*\
  !*** ./resources/src/components/Modals/ConfirmationDialog.tsx ***!
  \****************************************************************/
/*! exports provided: ConfirmationDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmationDialog", function() { return ConfirmationDialog; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");




var ConfirmationDialog = function (props) {
    var _a;
    var _b = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false), loading = _b[0], setLoading = _b[1];
    var handleSubmit = function () {
        setLoading(true);
        props.onSubmit(props.item)
            .then(function (res) {
            setLoading(false);
            props.onClose();
        })
            .catch(function (error) {
            setLoading(false);
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: props.open },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], null, props.title),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
            props.bodyText && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null, props.bodyText)),
            props.calendarItem && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('calendar_item', (_a = {}, _a["--" + props.calendarItem.variant] = Boolean(props.calendarItem.variant), _a)) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h6", { className: 'calendar_item__title' }, props.calendarItem.memo))))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_3__["LoadingButton"], { loading: loading, variant: 'text', color: 'primary', onClick: function () { return handleSubmit(); } }, props.confirmButtonText || 'Confirm'),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"))));
};


/***/ }),

/***/ "u7VM":
/*!*******************************************************!*\
  !*** ./resources/src/actions/staffScheduleActions.ts ***!
  \*******************************************************/
/*! exports provided: fetchStaffSchedule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStaffSchedule", function() { return fetchStaffSchedule; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "xkie");


var fetchStaffSchedule = function (staffID, dateTime) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/staff/" + staffID + "/schedule" + (dateTime ? "/" + dateTime : ''))
            .then(function (res) {
            var schedule = res.data;
            dispatch({
                type: _actions_types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STAFF_SCHEDULE"],
                payload: schedule
            });
        });
    };
};


/***/ }),

/***/ "v5HV":
/*!********************************************************!*\
  !*** ./resources/src/reducers/staffScheduleReducer.ts ***!
  \********************************************************/
/*! exports provided: staffScheduleReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staffScheduleReducer", function() { return staffScheduleReducer; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "xkie");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    schedule: {}
};
var staffScheduleReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_types__WEBPACK_IMPORTED_MODULE_0__["FETCH_STAFF_SCHEDULE"]:
            return __assign({}, state, { schedule: action.payload });
        default:
            return state;
    }
};


/***/ }),

/***/ "vkgE":
/*!*******************************************************!*\
  !*** ./resources/src/components/Sidebar/MenuItem.tsx ***!
  \*******************************************************/
/*! exports provided: MenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return MenuItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");



var MenuItem = function (props) {
    var MenuItemContent = function () { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { className: 'list_item' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ListItemIcon"], { className: 'list_item__icon' }, props.icon && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, props.icon))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ListItemText"], null, props.label))); };
    return props.to ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { className: 'menu_list__link', activeClassName: props.inactive ? undefined : '--selected', to: props.to },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItemContent, null))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItemContent, null));
};



/***/ }),

/***/ "vyTZ":
/*!********************************************************!*\
  !*** ./resources/src/actions/studentProfileActions.ts ***!
  \********************************************************/
/*! exports provided: fetchStudentProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStudentProfile", function() { return fetchStudentProfile; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchStudentProfile = function (studentID) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/students/profile/" + (studentID || 'self'))
            .then(function (res) {
            var student = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STUDENT_PROFILE"],
                payload: student
            });
        });
    };
};


/***/ }),

/***/ "wULA":
/*!**********************************************************!*\
  !*** ./resources/src/components/Reporting/Reporting.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-transition-group */ "iTG7");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_reportActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/reportActions */ "PF30");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_starActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/starActions */ "BHus");
/* harmony import */ var _utils_report__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/report */ "G75r");
/* harmony import */ var _Banner_Banner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Banner/Banner */ "L3AU");
/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Drawer */ "7iUc");
/* harmony import */ var _EmptyStateIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../EmptyStateIcon */ "iea3");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _StarButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../StarButton */ "elSr");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../TopNav */ "qcP7");
/* harmony import */ var _ReportDeleteModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ReportDeleteModal */ "FZ7O");
/* harmony import */ var _ReportEditor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ReportEditor */ "k8mV");
/* harmony import */ var _ReportNameModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ReportNameModal */ "292G");
/* harmony import */ var _ReportUnsavedModal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ReportUnsavedModal */ "msBc");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



















var REPORT_GROUPS = [
    { group: 'staff', name: 'Staff Reports' },
    { group: 'students', name: 'Student Reports' },
];
var REPORT_TYPES = {
    staff: [
        {
            name: 'Teacher Distribution',
            variant: 'teacher-distribution',
            group: 'staff',
            description: 'Distribution of students to teachers.'
        }
    ],
    students: [
        {
            name: 'Student Attendance',
            variant: 'student-attendance',
            group: 'students',
            description: 'Attendance for students.'
        }
    ]
};
var BANNERS = {
    NOT_FOUND: {
        icon: 'report_problem',
        message: 'The Report associated with this link could not be found.'
    },
    REPORT_PRIVATE: {
        icon: 'lock',
        message: "This Report isn't public, so only the owner of the Report can view it."
    }
};
var DEFAULT_VARIANT = 'teacher-distribution';
var Reporting = /** @class */ (function (_super) {
    __extends(Reporting, _super);
    function Reporting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            accessMenuRef: null,
            bannerIndex: 'NOT_FOUND',
            bannerOpen: false,
            currentReport: Object(_utils_report__WEBPACK_IMPORTED_MODULE_8__["createEmptyReport"])(DEFAULT_VARIANT),
            deleteReportModalOpen: false,
            deletingReport: null,
            drawerOpen: true,
            loadingReports: false,
            loadingSingleReport: false,
            menuRef: null,
            reportID: -1,
            reportingState: 'idle',
            reportNameModalOpen: false,
            reportUnsavedModalOpen: false,
            saveMenuRef: null,
            savedReport: null,
            uploading: false,
            onRejectSaveReport: function () { return null; }
        };
        _this.handleUpdateReport = function (params) {
            if (_this.state.uploading) {
                return;
            }
            _this.setState(function (state) {
                var updatedReport = __assign({}, state.currentReport, params);
                return { currentReport: updatedReport };
            });
        };
        _this.handleCreateReport = function (variant) {
            if (variant === void 0) { variant = DEFAULT_VARIANT; }
            _this.props.history.push('/reporting/new');
            _this.setState({
                savedReport: null,
                menuRef: null,
                currentReport: Object(_utils_report__WEBPACK_IMPORTED_MODULE_8__["createEmptyReport"])(variant)
            });
        };
        _this.toggleDrawerOpen = function () {
            _this.setState(function (state) { return ({ drawerOpen: !state.drawerOpen }); });
        };
        _this.fetchReports = function () {
            _this.setState({ loadingReports: true });
            return _this.props.fetchReports().then(function () {
                _this.setState({ loadingReports: false });
            });
        };
        _this.handleLoadReport = function (report) {
            if (_this.isReportUnchanged()) {
                _this.setState({
                    savedReport: report,
                    currentReport: report
                });
                _this.props.history.push("/reporting/" + report.id);
            }
            else {
                _this.setState({
                    onRejectSaveReport: function () {
                        _this.setState({
                            savedReport: report,
                            currentReport: report,
                            onRejectSaveReport: function () { return null; }
                        });
                        _this.props.history.push("/reporting/" + report.id);
                    }
                }, function () {
                    _this.setState({ reportUnsavedModalOpen: true });
                });
            }
        };
        _this.handleChangeAccess = function (access) {
            _this.handleUpdateReport({ access: access });
            _this.setState({ accessMenuRef: null });
        };
        _this.isReportUnchanged = function () {
            return _this.state.savedReport != null && _this.state.currentReport != null && (Object.keys(_this.state.currentReport).every(function (reportKey) {
                return _this.state.currentReport[reportKey] === _this.state.savedReport[reportKey];
            }));
        };
        _this.handleSaveReport = function () {
            if (_this.state.savedReport) {
                _this.setState({ uploading: true });
                _this.props.updateReport(_this.state.currentReport)
                    .then(function () {
                    _this.setState({
                        uploading: false,
                        savedReport: _this.state.currentReport
                    });
                    _this.props.queueSnackbar({ message: 'Updated Report successfully.' });
                })
                    .catch(function (error) {
                    _this.setState({ uploading: false });
                });
            }
            else {
                _this.handleSaveReportAs();
            }
        };
        _this.handleSaveReportAs = function () {
            _this.setState({
                saveMenuRef: null,
                reportNameModalOpen: true
            });
        };
        _this.onSaveReportAs = function (reportName) {
            _this.setState({ uploading: true, reportNameModalOpen: false });
            _this.props.createReport(__assign({}, _this.state.currentReport, { name: reportName }))
                .then(function () {
                _this.props.history.push("/reporting/" + _this.props.changedReport.id);
                _this.props.queueSnackbar({ message: 'Created Report successfully.' });
                _this.setState({
                    currentReport: _this.props.changedReport,
                    savedReport: _this.props.changedReport,
                    uploading: false
                });
            })
                .catch(function (error) {
                _this.setState({ uploading: false });
                var response = error.response;
                if (response && response.data.message) {
                    _this.props.queueSnackbar({ message: response.data.message });
                }
            });
        };
        _this.handleDeleteReport = function (report) {
            _this.setState({
                deleteReportModalOpen: true,
                deletingReport: report
            });
        };
        _this.onDeleteReport = function (reportID) {
            return _this.props.deleteReport(reportID)
                .then(function () {
                _this.props.queueSnackbar({ message: 'Deleted Report successfully.' });
                if (_this.props.reportingRoute === 'saved') {
                    var routerReportID = _this.props.match.params.reportID;
                    if (parseInt(routerReportID, 10) === reportID) {
                        _this.handleCreateReport();
                    }
                }
            })
                .catch(function (error) {
                var response = error.response;
                if (response && response.data.message) {
                    _this.props.queueSnackbar({ message: response.data.message });
                }
            });
        };
        _this.toggleStarred = function (isStarred) {
            var starredItem = {
                item_id: _this.state.currentReport.id,
                item_type: 'report'
            };
            if (_this.props.currentUser.account_type !== 'staff') {
                return;
            }
            if (!_this.state.currentReport.id) {
                return;
            }
            if (isStarred) {
                _this.props.unstarItem(starredItem);
            }
            else {
                _this.props.starItem(starredItem);
            }
        };
        return _this;
    }
    Reporting.prototype.componentDidMount = function () {
        var _this = this;
        this.fetchReports().then(function () {
            var reportID = parseInt(_this.props.match.params.reportID, 10);
            if (_this.props.reportingRoute === 'saved') {
                var loadedReport = _this.props.reports.find(function (report) {
                    return report.id === reportID;
                });
                if (loadedReport) {
                    _this.setState({
                        savedReport: loadedReport,
                        currentReport: loadedReport
                    });
                    _this.props.history.push("/reporting/" + loadedReport.id);
                }
                else {
                    _this.setState({ loadingSingleReport: true });
                    Object(_actions_reportActions__WEBPACK_IMPORTED_MODULE_5__["fetchReportByID"])(reportID)
                        .then(function (response) {
                        _this.setState({ loadingSingleReport: false });
                        var report = response.data;
                        _this.setState({
                            savedReport: null,
                            currentReport: report
                        });
                    }, function (error) {
                        _this.setState({ loadingSingleReport: true });
                        var response = error.response;
                        _this.handleCreateReport();
                        switch (response.status) {
                            case 404:
                                _this.setState({ bannerOpen: true, bannerIndex: 'NOT_FOUND' });
                                break;
                            case 403:
                                _this.setState({ bannerOpen: true, bannerIndex: 'REPORT_PRIVATE' });
                                break;
                            default:
                                // const { response } = error
                                if (response && response.data.message) {
                                    _this.props.queueSnackbar({ message: response.data.message });
                                }
                                break;
                        }
                    });
                }
            }
        });
    };
    Reporting.prototype.render = function () {
        var _this = this;
        console.log('Reporting.PROPS:', this.props);
        console.log('Reporting.STATE:', this.state);
        var loading = (this.state.loadingReports || this.state.loadingSingleReport) && this.props.reportingRoute === 'saved';
        var isReportUnchanged = this.isReportUnchanged();
        var breadcrumbs = [{ value: 'Reporting', to: '/reporting' }];
        var reportSelected = this.props.reportingRoute !== 'unselected';
        if (this.state.currentReport && reportSelected) {
            breadcrumbs.push({ value: this.state.currentReport.name || _utils_report__WEBPACK_IMPORTED_MODULE_8__["REPORT_PLACEHOLDER_NAME"] });
        }
        var reportGroups = REPORT_GROUPS.map(function (groupInfo) { return groupInfo.group; });
        var variantDetails = reportGroups
            .reduce(function (acc, reportGroup, index) {
            acc.push.apply(acc, REPORT_TYPES[reportGroup]);
            return acc;
        }, [])
            .find(function (reportVariantInfo) {
            return reportVariantInfo.variant === _this.state.currentReport.variant;
        });
        var starred = this.props.newStarred && this.props.newStarred.item_id === this.state.currentReport.id
            && this.props.newStarred.item_type === 'report' ? (this.props.newStarred.isStarred !== false) : this.state.currentReport.starred;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportUnsavedModal__WEBPACK_IMPORTED_MODULE_18__["ReportUnsavedModal"], { open: this.state.reportUnsavedModalOpen, onSubmit: this.state.onRejectSaveReport, onClose: function () { return _this.setState({ reportUnsavedModalOpen: false }); } }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportNameModal__WEBPACK_IMPORTED_MODULE_17__["ReportNameModal"], { open: this.state.reportNameModalOpen, name: this.state.currentReport.name, onSubmit: this.onSaveReportAs, onClose: function () { return _this.setState({ reportNameModalOpen: false }); } }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportDeleteModal__WEBPACK_IMPORTED_MODULE_15__["ReportDeleteModal"], { open: this.state.deleteReportModalOpen, onDelete: this.onDeleteReport, onClose: function () { return _this.setState({ deleteReportModalOpen: false }); }, report: this.state.deletingReport, variantDetails: variantDetails }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Drawer__WEBPACK_IMPORTED_MODULE_10__["Drawer"], { title: 'My Reports', open: this.state.drawerOpen }, this.state.loadingReports ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'drawer__loading' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["CircularProgress"], { size: 32 }))) : (this.props.reports && this.props.reports.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["List"], null, this.props.reports.map(function (report, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItem"], { dense: true, button: true, key: index, onClick: function () { return _this.handleLoadReport(report); } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItemText"], null, report.name),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ListItemSecondaryAction"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { onClick: function () { return _this.handleDeleteReport(report); } },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "delete"))))); }))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EmptyStateIcon__WEBPACK_IMPORTED_MODULE_11__["EmptyStateIcon"], { variant: 'star' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "No Reports found"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Reports you save will appear here."))))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content', id: 'content' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Banner_Banner__WEBPACK_IMPORTED_MODULE_9__["Banner"], __assign({ variant: 'static', message: BANNERS[this.state.bannerIndex].message, open: this.state.bannerOpen, onClose: function () { return _this.setState({ bannerOpen: false }); } }, BANNERS[this.state.bannerIndex])),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_14__["TopNav"], { loading: loading, breadcrumbs: breadcrumbs, actions: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                        reportSelected && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'contained', color: 'primary', disabled: loading }, "Run Report")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["ButtonGroup"], { variant: 'contained' },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_12__["LoadingButton"], { disabled: isReportUnchanged || loading, onClick: function () { return _this.handleSaveReport(); }, loading: this.state.uploading }, "Save"),
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { size: 'small', onClick: function (event) { return _this.setState({ saveMenuRef: event.currentTarget }); }, disabled: loading },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "arrow_drop_down"))),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Menu"], { open: !!this.state.saveMenuRef, anchorEl: this.state.saveMenuRef, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, getContentAnchorEl: null, onClose: function () { return _this.setState({ saveMenuRef: null }); } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { onClick: function () { return _this.handleSaveReportAs(); } }, "Save As"))),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: 'text', color: 'primary', onClick: function (event) { return _this.setState({ accessMenuRef: event.currentTarget }); }, disabled: loading },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, this.state.currentReport.access === 'public' ? 'public' : 'lock'),
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.state.currentReport.access === 'public' ? 'Public' : 'Private')),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Menu"], { open: !!this.state.accessMenuRef, anchorEl: this.state.accessMenuRef, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, getContentAnchorEl: null, onClose: function () { return _this.setState({ accessMenuRef: null }); } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { className: 'report_access', onClick: function () { return _this.handleChangeAccess('public'); } },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Radio"], { color: 'primary', checked: this.state.currentReport.access === 'public' })),
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'body1', component: 'h6' },
                                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "public"),
                                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Public")),
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'body1', component: 'p' }, "Anyone with the link to this report can view it."))),
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { className: 'report_access', onClick: function () { return _this.handleChangeAccess('private'); } },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Radio"], { color: 'primary', checked: this.state.currentReport.access === 'private' })),
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'body1', component: 'h6' },
                                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "lock"),
                                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Private")),
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'body1', component: 'p' }, "Only you can view this report."))))),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StarButton__WEBPACK_IMPORTED_MODULE_13__["StarButton"], { isStarred: starred, onClick: function () { return _this.toggleStarred(starred); }, disabled: !this.state.currentReport.id })),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { onClick: function (event) { return _this.setState({ menuRef: event.currentTarget }); } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "more_vert")),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Menu"], { open: !!this.state.menuRef, anchorEl: this.state.menuRef, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, getContentAnchorEl: null, onClose: function () { return _this.setState({ menuRef: null }); } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], { onClick: function () { return _this.handleCreateReport(); } }, "New " + variantDetails.name + " Report"))))),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { title: 'My Reports' },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { onClick: function () { return _this.toggleDrawerOpen(); } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Icon"], null, "assessment"))))) }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'reporting', id: 'reporting' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_3__["TransitionGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_3__["CSSTransition"], { timeout: 450, classNames: 'fade', key: this.props.location.key },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], { location: this.props.location },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { path: ['/reporting/new', '/reporting/:reportID'], render: function (props) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'router_page' },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportEditor__WEBPACK_IMPORTED_MODULE_16__["ReportEditor"], __assign({ reportingState: _this.state.reportingState, onUpdateReport: _this.handleUpdateReport, report: _this.state.currentReport, variantDetails: variantDetails, loading: loading }, props)))); } }),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { exact: true, path: '/reporting', render: function () { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'router_page' }, REPORT_GROUPS.map(function (reportGroup) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { key: reportGroup.group },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'h6' }, reportGroup.name),
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'reporting__group' }, REPORT_TYPES[reportGroup.group].map(function (reportVariant) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Card"], { className: 'reporting__variant', key: reportVariant.variant },
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["CardActionArea"], { onClick: function () { return _this.handleCreateReport(reportVariant.variant); } },
                                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { height: 112, style: { width: '100%', objectFit: 'cover' }, src: '/static/images/report-sample.jpg', onLoad: function () { return _this.forceUpdate(); } }),
                                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["CardContent"], null,
                                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'h5' }, reportVariant.name),
                                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], { variant: 'body2' }, reportVariant.description))))); })))); }))); } }))))))));
    };
    return Reporting;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    currentUser: state.auth.user,
    changedReport: state.reports.item,
    newStarred: state.starred.item,
    reports: state.reports.items
}); };
var mapDispatchToProps = {
    fetchReports: _actions_reportActions__WEBPACK_IMPORTED_MODULE_5__["fetchReports"],
    createReport: _actions_reportActions__WEBPACK_IMPORTED_MODULE_5__["createReport"],
    updateReport: _actions_reportActions__WEBPACK_IMPORTED_MODULE_5__["updateReport"],
    deleteReport: _actions_reportActions__WEBPACK_IMPORTED_MODULE_5__["deleteReport"],
    starItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_7__["starItem"],
    unstarItem: _actions_starActions__WEBPACK_IMPORTED_MODULE_7__["unstarItem"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_6__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Reporting));


/***/ }),

/***/ "wWKE":
/*!**********************************************!*\
  !*** ./resources/src/actions/userActions.ts ***!
  \**********************************************/
/*! exports provided: fetchUsers, disableUser, invalidatePassword, resetPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsers", function() { return fetchUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableUser", function() { return disableUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidatePassword", function() { return invalidatePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPassword", function() { return resetPassword; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchUsers = function () {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/users')
            .then(function (res) {
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_USERS"],
                payload: res.data
            });
        });
    };
};
var disableUser = function (userId) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/api/users/disable/" + userId)
            .then(function (res) {
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["DISABLE_USER"],
                payload: res.data
            });
        });
    };
};
var invalidatePassword = function (userId) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/users/invalidate-password/" + userId)
            .then(function (res) {
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["INVALIDATE_PASSWORD"],
                payload: res.data
            });
        });
    };
};
var resetPassword = function (userId) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/api/users/reset-password/" + userId)
            .then(function (res) {
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["RESET_PASSWORD"],
                payload: res.data
            });
        });
    };
};


/***/ }),

/***/ "x2q7":
/*!*************************************************************!*\
  !*** ./resources/src/components/Form/LoadingIconButton.tsx ***!
  \*************************************************************/
/*! exports provided: LoadingIconButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingIconButton", function() { return LoadingIconButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


var LoadingIconButton = /** @class */ (function (_super) {
    __extends(LoadingIconButton, _super);
    function LoadingIconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingIconButton.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, loading = _a.loading, children = _a.children, rest = __rest(_a, ["disabled", "loading", "children"]);
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'button-container' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], __assign({}, rest, { disabled: disabled || loading }), children),
            loading && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["CircularProgress"], { size: 24, className: 'button-progress' }))));
    };
    return LoadingIconButton;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));



/***/ }),

/***/ "xLDs":
/*!****************************************************!*\
  !*** ./resources/src/components/Wiki/WikiPost.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-markdown */ "IujW");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "55Ip");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var renderers = {
    link: function (props) { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: props.href }, props.children); }
};
var WikiPost = /** @class */ (function (_super) {
    __extends(WikiPost, _super);
    function WikiPost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WikiPost.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], { variant: 'h3' }, this.props.post.title),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1___default.a, { source: this.props.post.body, renderers: renderers })));
    };
    return WikiPost;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (WikiPost);


/***/ }),

/***/ "xZWj":
/*!*************************************************!*\
  !*** ./resources/src/actions/checkinActions.ts ***!
  \*************************************************/
/*! exports provided: fetchCheckInStatus, checkIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCheckInStatus", function() { return fetchCheckInStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIn", function() { return checkIn; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchCheckInStatus = function (dateTime) {
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(dateTime ? "/api/check-in/status/" + dateTime : '/api/check-in/status')
            .then(function (res) {
            var status = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_CHECKIN_STATUS"],
                payload: status
            });
        });
    };
};
var checkIn = function (request) {
    if (!request.date) {
        request.date = new Date().toISOString();
    }
    return function (dispatch) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/check-in', request)
            .then(function (res) {
            var checkInResponse = res.data;
            dispatch({
                type: _types__WEBPACK_IMPORTED_MODULE_1__["CHECK_IN"],
                payload: checkInResponse
            });
        });
    };
};


/***/ }),

/***/ "xkie":
/*!****************************************!*\
  !*** ./resources/src/actions/types.ts ***!
  \****************************************/
/*! exports provided: FETCH_STUDENTS, NEW_STUDENT, DELETE_STUDENT, UPDATE_STUDENT, FETCH_STAFF, NEW_STAFF, DELETE_STAFF, UPDATE_STAFF, FETCH_CLUSTERS, NEW_CLUSTER, DELETE_CLUSTER, UPDATE_CLUSTER, ATTACH_STUDENTS, DETATCH_STUDENTS, SET_CURRENT_USER, FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM, FETCH_STUDENT_PROFILE, FETCH_STUDENT_SCHEDULE, FETCH_STAFF_SCHEDULE, FETCH_STAFF_PROFILE, FETCH_SETTINGS, ARCHIVE_ALL_NOTIFICATIONS, ARCHIVE_NOTIFICATION, FETCH_NOTIFICATION_INBOX, FETCH_NOTIFICATION_OUTBOX, MARK_ALL_NOTIFICATIONS_READ, MARK_NOTIFICATION_READ, MARK_NOTIFICATION_UNREAD, UNARCHIVE_NOTIFICATION, SEND_NOTIFICATION, FETCH_CHECKIN_STATUS, ENABLE_AIR, DISABLE_AIR, CHECK_IN, FETCH_TOPICS, NEW_TOPIC, NEW_TOPIC_SCHEDULE, DELETE_TOPIC, DELETE_TOPIC_SCHEDULE, QUEUE_SNACKBAR, DEQUEUE_SNACKBAR, FETCH_STAFF_LIST, FETCH_USERS, RESET_PASSWORD, INVALIDATE_PASSWORD, DISABLE_USER, FETCH_REPORTS, CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT, FETCH_WIKI_GROUPS, FETCH_WIKI_GROUP_POSTS, FETCH_WIKI_POST, CREATE_WIKI_POST, CREATE_WIKI_GROUP, UPDATE_WIKI_POST, UPDATE_WIKI_GROUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STUDENTS", function() { return FETCH_STUDENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_STUDENT", function() { return NEW_STUDENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_STUDENT", function() { return DELETE_STUDENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_STUDENT", function() { return UPDATE_STUDENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STAFF", function() { return FETCH_STAFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_STAFF", function() { return NEW_STAFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_STAFF", function() { return DELETE_STAFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_STAFF", function() { return UPDATE_STAFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CLUSTERS", function() { return FETCH_CLUSTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_CLUSTER", function() { return NEW_CLUSTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_CLUSTER", function() { return DELETE_CLUSTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CLUSTER", function() { return UPDATE_CLUSTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTACH_STUDENTS", function() { return ATTACH_STUDENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DETATCH_STUDENTS", function() { return DETATCH_STUDENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_USER", function() { return SET_CURRENT_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STARRED", function() { return FETCH_STARRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAR_ITEM", function() { return STAR_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSTAR_ITEM", function() { return UNSTAR_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STUDENT_PROFILE", function() { return FETCH_STUDENT_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STUDENT_SCHEDULE", function() { return FETCH_STUDENT_SCHEDULE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STAFF_SCHEDULE", function() { return FETCH_STAFF_SCHEDULE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STAFF_PROFILE", function() { return FETCH_STAFF_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SETTINGS", function() { return FETCH_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARCHIVE_ALL_NOTIFICATIONS", function() { return ARCHIVE_ALL_NOTIFICATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARCHIVE_NOTIFICATION", function() { return ARCHIVE_NOTIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFICATION_INBOX", function() { return FETCH_NOTIFICATION_INBOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFICATION_OUTBOX", function() { return FETCH_NOTIFICATION_OUTBOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARK_ALL_NOTIFICATIONS_READ", function() { return MARK_ALL_NOTIFICATIONS_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARK_NOTIFICATION_READ", function() { return MARK_NOTIFICATION_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARK_NOTIFICATION_UNREAD", function() { return MARK_NOTIFICATION_UNREAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNARCHIVE_NOTIFICATION", function() { return UNARCHIVE_NOTIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEND_NOTIFICATION", function() { return SEND_NOTIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CHECKIN_STATUS", function() { return FETCH_CHECKIN_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENABLE_AIR", function() { return ENABLE_AIR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISABLE_AIR", function() { return DISABLE_AIR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_IN", function() { return CHECK_IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TOPICS", function() { return FETCH_TOPICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_TOPIC", function() { return NEW_TOPIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_TOPIC_SCHEDULE", function() { return NEW_TOPIC_SCHEDULE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_TOPIC", function() { return DELETE_TOPIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_TOPIC_SCHEDULE", function() { return DELETE_TOPIC_SCHEDULE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUEUE_SNACKBAR", function() { return QUEUE_SNACKBAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEQUEUE_SNACKBAR", function() { return DEQUEUE_SNACKBAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STAFF_LIST", function() { return FETCH_STAFF_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS", function() { return FETCH_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_PASSWORD", function() { return RESET_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALIDATE_PASSWORD", function() { return INVALIDATE_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISABLE_USER", function() { return DISABLE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_REPORTS", function() { return FETCH_REPORTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_REPORT", function() { return CREATE_REPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_REPORT", function() { return UPDATE_REPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_REPORT", function() { return DELETE_REPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_WIKI_GROUPS", function() { return FETCH_WIKI_GROUPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_WIKI_GROUP_POSTS", function() { return FETCH_WIKI_GROUP_POSTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_WIKI_POST", function() { return FETCH_WIKI_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_WIKI_POST", function() { return CREATE_WIKI_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_WIKI_GROUP", function() { return CREATE_WIKI_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_WIKI_POST", function() { return UPDATE_WIKI_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_WIKI_GROUP", function() { return UPDATE_WIKI_GROUP; });
// Students
var FETCH_STUDENTS = 'FETCH_STUDENTS';
var NEW_STUDENT = 'NEW_STUDENT';
var DELETE_STUDENT = 'DELETE_STUDENT';
var UPDATE_STUDENT = 'UPDATE_STUDENT';
// Staff
var FETCH_STAFF = 'FETCH_STAFF';
var NEW_STAFF = 'NEW_STAFF';
var DELETE_STAFF = 'DELETE_STAFF';
var UPDATE_STAFF = 'UPDATE_STAFF';
// Clusters
var FETCH_CLUSTERS = 'FETCH_CLUSTERS';
var NEW_CLUSTER = 'NEW_CLUSTER';
var DELETE_CLUSTER = 'DELETE_CLUSTER';
var UPDATE_CLUSTER = 'UPDATE_CLUSTER';
var ATTACH_STUDENTS = 'ATTACH_STUDENTS';
var DETATCH_STUDENTS = 'DETATCH_STUDENTS';
// Authorization
var SET_CURRENT_USER = 'SET_CURRENT_USER';
// Starred
var FETCH_STARRED = 'FETCH_STARRED';
var STAR_ITEM = 'STAR_ITEM';
var UNSTAR_ITEM = 'UNSTAR_ITEM';
// Student Profile
var FETCH_STUDENT_PROFILE = 'FETCH_STUDENT_PROFILE';
// Student Schedule
var FETCH_STUDENT_SCHEDULE = 'FETCH_STUDENT_SCHEDULE';
// Staff Schedule
var FETCH_STAFF_SCHEDULE = 'FETCH_STAFF_SCHEDULE';
// Staff Profile
var FETCH_STAFF_PROFILE = 'FETCH_STAFF_PROFILE';
// Settings
var FETCH_SETTINGS = 'FETCH_SETTINGS';
// Notifications
var ARCHIVE_ALL_NOTIFICATIONS = 'ARCHIVE_ALL_NOTIFICATIONS';
var ARCHIVE_NOTIFICATION = 'ARCHIVE_NOTIFICATION';
var FETCH_NOTIFICATION_INBOX = 'FETCH_NOTIFICATION_INBOX';
var FETCH_NOTIFICATION_OUTBOX = 'FETCH_NOTIFICATION_OUTBOX';
var MARK_ALL_NOTIFICATIONS_READ = 'MARK_ALL_NOTIFICATIONS_READ';
var MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ';
var MARK_NOTIFICATION_UNREAD = 'MARK_NOTIFICATION_UNREAD';
var UNARCHIVE_NOTIFICATION = 'UNARCHIVE_NOTIFICATION';
var SEND_NOTIFICATION = 'SEND_NOTIFICATION';
// Check-in
var FETCH_CHECKIN_STATUS = 'FETCH_CHECKIN_STATUS';
var ENABLE_AIR = 'ENABLE_AIR';
var DISABLE_AIR = 'DISABLE_AIR';
var CHECK_IN = 'CHECK_IN';
// Topics
var FETCH_TOPICS = 'FETCH_TOPICS';
var NEW_TOPIC = 'NEW_TOPIC';
var NEW_TOPIC_SCHEDULE = 'NEW_TOPIC_SCHEDULE';
var DELETE_TOPIC = 'DELETE_TOPIC';
var DELETE_TOPIC_SCHEDULE = 'DELETE_TOPIC_SCHEDULE';
// Snackbar
var QUEUE_SNACKBAR = 'QUEUE_SNACKBAR';
var DEQUEUE_SNACKBAR = 'DEQUEUE_SNACKBAR';
// Student Plan
var FETCH_STAFF_LIST = 'FETCH_STAFF_LIST';
// Users
var FETCH_USERS = 'FETCH_USERS';
var RESET_PASSWORD = 'RESET_PASSWORD';
var INVALIDATE_PASSWORD = 'INVALIDATE_PASSWORD';
var DISABLE_USER = 'DISABLE_USER';
// Reports
var FETCH_REPORTS = 'FETCH_REPORTS';
var CREATE_REPORT = 'CREATE_REPORT';
var UPDATE_REPORT = 'UPDATE_REPORT';
var DELETE_REPORT = 'DELETE_REPORT';
// Wiki
var FETCH_WIKI_GROUPS = 'FETCH_WIKI_GROUPS';
var FETCH_WIKI_GROUP_POSTS = 'FETCH_WIKI_GROUP_POSTS';
var FETCH_WIKI_POST = 'FETCH_WIKI_POST';
var CREATE_WIKI_POST = 'CREATE_WIKI_POST';
var CREATE_WIKI_GROUP = 'CREATE_WIKI_GROUP';
var UPDATE_WIKI_POST = 'UPDATE_WIKI_GROUP';
var UPDATE_WIKI_GROUP = 'UPDATE_WIKI_GROUP';


/***/ }),

/***/ "yNeP":
/*!************************************************************!*\
  !*** ./resources/src/components/Calendar/NewAmendment.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/studentScheduleActions */ "60lH");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var NewAmendment = /** @class */ (function (_super) {
    __extends(NewAmendment, _super);
    function NewAmendment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            error: null,
            open: false,
            uploading: false,
            value: ''
        };
        _this.handleOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({
                open: false,
                value: ''
            });
        };
        _this.handleChange = function (event) {
            if (_this.state.uploading) {
                return;
            }
            _this.setState({
                value: event.target.value,
                error: null
            });
        };
        _this.handleSubmit = function () {
            if (_this.state.value.length === 0) {
                _this.setState({ error: 'This field cannot be empty.' });
                return;
            }
            _this.setState({ uploading: true });
            var amendment = {
                student_id: _this.props.studentID,
                block_id: _this.props.blockDetails.block_id,
                date: _this.props.blockDetails.date,
                memo: _this.state.value
            };
            _this.props.createAmendment(amendment)
                .then(function () {
                _this.props.onSubmit().then(function () {
                    _this.setState({ uploading: false });
                    _this.props.queueSnackbar({ message: 'Amended schedule.' });
                    _this.handleClose();
                });
            })
                .catch(function () {
                _this.setState({
                    error: "That didn't work. Please try again.",
                    uploading: false
                });
            });
        };
        return _this;
    }
    NewAmendment.prototype.render = function () {
        var _this = this;
        var isErrored = Boolean(this.state.error);
        return this.state.open ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_widget' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { value: this.state.value, onChange: this.handleChange, variant: 'filled', placeholder: 'Memo', label: 'Amendment', error: isErrored, helperText: isErrored ? this.state.error : undefined, margin: 'normal', fullWidth: true }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_widget__actions' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_4__["LoadingButton"], { loading: this.state.uploading, onClick: function () { return _this.handleSubmit(); }, variant: 'text', color: 'primary' }, "Submit"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return _this.handleClose(); } }, "Cancel")))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'calendar_item__container' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', color: 'primary', onClick: function () { return _this.handleOpen(); } }, "Amend")));
    };
    return NewAmendment;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapDispatchToProps = { createAmendment: _actions_studentScheduleActions__WEBPACK_IMPORTED_MODULE_3__["createAmendment"], queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_5__["queueSnackbar"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(NewAmendment));


/***/ }),

/***/ "yi5S":
/*!*************************************************!*\
  !*** ./resources/src/actions/studentActions.ts ***!
  \*************************************************/
/*! exports provided: fetchStudents, createStudent, deleteStudent, updateStudent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStudents", function() { return fetchStudents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStudent", function() { return createStudent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteStudent", function() { return deleteStudent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStudent", function() { return updateStudent; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "xkie");


var fetchStudents = function () { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/students')
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_STUDENTS"],
        payload: res.data
    }); });
}; };
var createStudent = function (studentData) { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/students', studentData)
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["NEW_STUDENT"],
        payload: res.data
    }); });
}; };
var deleteStudent = function (studentID) { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/api/students" + studentID)
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["DELETE_STUDENT"],
        payload: res.data
    }); });
}; };
var updateStudent = function (studentData) { return function (dispatch) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.put('/api/students', studentData)
        .then(function (res) { return dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_STUDENT"],
        payload: res.data
    }); });
}; };


/***/ }),

/***/ "z4zl":
/*!*************************************************************!*\
  !*** ./resources/src/components/Modals/StaffInfoDialog.tsx ***!
  \*************************************************************/
/*! exports provided: StaffInfoDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffInfoDialog", function() { return StaffInfoDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_swipeable_views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-swipeable-views */ "7VIw");
/* harmony import */ var react_swipeable_views__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_swipeable_views__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Form_LoadingButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/LoadingButton */ "01Up");
/* harmony import */ var _Form_UploadUserForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/UploadUserForm */ "hsRR");
/* harmony import */ var _Modals_ConfirmPasswordDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Modals/ConfirmPasswordDialog */ "Vdut");
/* harmony import */ var _EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EnhancedDialogTitle */ "ePNl");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};








var TITLES = ['Dr.', 'Miss', 'Ms.', 'Mlle.', 'Mme.', 'Mr.', 'Mrs.', 'Prof.'];
var emptyStaffRequest = {
    email: '',
    first_name: '',
    last_name: '',
    title: 'Mr.',
    initials: '',
    administrator: false
};
var defaultListItems = [
    { label: 'Email Address', value: 'email' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Title', value: 'title' },
];
var StaffInfoDialog = function (props) {
    var edit = props.edit !== false && !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(props.staffDetails);
    var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(0), tab = _a[0], setTab = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(edit ? props.staffDetails : emptyStaffRequest), details = _b[0], setDetails = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), uploading = _c[0], setUploading = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), userExists = _d[0], setUserExists = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), errored = _e[0], setErrored = _e[1];
    var _f = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false), passwordDialogOpen = _f[0], setPasswordDialogOpen = _f[1];
    var handleInputChange = function (event) {
        var _a;
        setErrored(false);
        var _b = event.target, name = _b.name, value = _b.value;
        if (name === 'initials') {
            if (value.length > 2) {
                return;
            }
            setDetails(__assign({}, details, { initials: value.toUpperCase() }));
            return;
        }
        if (name === 'email') {
            setUserExists(false);
        }
        var firstName = name === 'first_name' ? value : details.first_name;
        var lastName = name === 'last_name' ? value : details.last_name;
        var autoInitials = null;
        if (name === 'first_name' || name === 'last_name') {
            autoInitials = firstName.length > 0 || lastName.length > 0
                ? ("" + firstName.slice(0, 1).trim() + lastName.slice(0, 1).trim()).trim().toUpperCase()
                : '';
        }
        setDetails(__assign({}, details, (_a = {}, _a[name] = value, _a.initials = autoInitials === null ? details.initials : autoInitials, _a)));
    };
    var toggleAdministrator = function () {
        setDetails(__assign({}, details, { administrator: !details.administrator }));
    };
    var handleTabChange = function (event, value) {
        setTab(value);
    };
    var handlePasswordDialogOpen = function () {
        setPasswordDialogOpen(true);
    };
    var handlePasswordDialogClose = function () {
        setPasswordDialogOpen(false);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        setPasswordDialogOpen(true);
    };
    var handleCreate = function (password) {
        setUploading(true);
        props.onSubmit(event, details, password)
            .then(function () {
            setUploading(false);
            props.onClose();
        })
            .catch(function (error) {
            var errorCode = error.response.status;
            setUploading(false);
            switch (errorCode) {
                case 409:
                    setUserExists(true);
                    break;
                default:
                    setErrored(true);
                    break;
            }
        });
    };
    var navTabs = {
        value: tab,
        onChange: handleTabChange,
        tabs: ['Single', 'File Upload']
    };
    var SingleForm = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: 'dialog-form', onSubmit: handleSubmit, autoComplete: 'off' },
            !edit && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'email', label: 'Email Address', value: details.email, onChange: handleInputChange, className: 'text-field', required: true, error: userExists, helperText: userExists
                    ? 'A staff member with this email address already exists.'
                    : undefined, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'dialog-form__row' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'last_name', label: 'Last Name', value: details.last_name, onChange: handleInputChange, className: 'text-field', required: true, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'first_name', label: 'First Name', value: details.first_name, onChange: handleInputChange, className: 'text-field', required: true, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'dialog-form__row' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'title', id: 'title', select: true, variant: 'outlined', label: 'Title', margin: 'normal', fullWidth: true, onChange: handleInputChange, value: details.title, required: true }, TITLES.map(function (title, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MenuItem"], { value: title, key: index }, title)); })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { name: 'initials', label: 'Initials', value: details.initials, onChange: handleInputChange, className: 'text-field', required: true, margin: 'normal', fullWidth: true, type: 'text', variant: 'outlined' })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormControlLabel"], { control: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], { value: details.administrator, name: 'administrator', checked: details.administrator, onChange: function () { return toggleAdministrator(); }, color: 'primary' }), label: 'Administrator' }),
            errored && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { variant: 'subtitle1', color: 'error' }, "Something went wrong. Please try again.")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: 'text', onClick: function () { return props.onClose(); } }, "Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_LoadingButton__WEBPACK_IMPORTED_MODULE_4__["LoadingButton"], { loading: uploading, variant: 'contained', color: 'primary', type: 'submit' }, edit ? 'Update' : 'Add Staff')))));
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_ConfirmPasswordDialog__WEBPACK_IMPORTED_MODULE_6__["ConfirmPasswordDialog"], { open: passwordDialogOpen, onClose: handlePasswordDialogClose, onSubmit: handleCreate, actionItems: ['Create staff accounts'] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: props.open, scroll: 'paper', "aria-labelledby": 'student-dialog-title' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EnhancedDialogTitle__WEBPACK_IMPORTED_MODULE_7__["EnhancedDialogTitle"], { id: 'student-dialog-title', onClose: props.onClose, tabs: !edit && navTabs, title: props.edit ? 'Edit Staff' : 'Add Staff' }),
            edit ? SingleForm : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_swipeable_views__WEBPACK_IMPORTED_MODULE_1___default.a, { index: navTabs.value },
                SingleForm,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_UploadUserForm__WEBPACK_IMPORTED_MODULE_5__["UploadUserForm"], { onClose: props.onClose, headers: defaultListItems, userType: 'staff' }))))));
};


/***/ }),

/***/ "zHmr":
/*!*****************************************************!*\
  !*** ./resources/src/components/Views/Students.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "/MKj");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "TTf+");
/* harmony import */ var _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/snackbarActions */ "Eccy");
/* harmony import */ var _actions_studentActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/studentActions */ "yi5S");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/utils */ "2bo5");
/* harmony import */ var _Modals_StudentInfoDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Modals/StudentInfoDialog */ "eYs1");
/* harmony import */ var _Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Table/EnhancedTable */ "0q+F");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var Students = /** @class */ (function (_super) {
    __extends(Students, _super);
    function Students() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            students: [],
            addDialogOpen: false,
            clusters: [],
            loading: false,
            snackbarOpen: false
        };
        _this.onAddDialogOpen = function () {
            _this.setState({ addDialogOpen: true });
        };
        _this.onAddDialogClose = function () {
            _this.setState({ addDialogOpen: false });
        };
        _this.handleAddStudentSubmit = function (event, studentDetails) {
            event.preventDefault();
            return _this.props.createStudent(studentDetails)
                .then(function (res) {
                _this.props.queueSnackbar({
                    message: 'Student created.',
                    links: [{ value: 'See Profile', to: "/students/" + _this.props.newStudent.id }]
                });
            });
        };
        return _this;
    }
    Students.prototype.componentDidMount = function () {
        var _this = this;
        document.title = 'Students - Spotlight';
        this.setState({ loading: true });
        this.props.fetchStudents().then(function (res) {
            _this.setState({ loading: false });
        });
    };
    Students.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.newStudent && !Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(nextProps.newStudent)) {
            this.props.students.unshift(nextProps.newStudent);
        }
    };
    Students.prototype.render = function () {
        var _this = this;
        var students = this.props.students.map(function (student, index) {
            return {
                id: index,
                last_name: student.last_name,
                first_name: student.first_name,
                grade: student.grade,
                class: student.grade >= 11 ? 'Senior' : 'Junior',
                profile: student.id
            };
        });
        var columns = [
            {
                id: 'last_name',
                label: 'Last Name',
                th: true,
                isNumeric: false,
                disablePadding: true,
                searchable: true,
                filterable: true,
                visible: true
            },
            {
                id: 'first_name',
                label: 'First Name',
                disablePadding: true,
                th: true,
                isNumeric: false,
                filterable: true,
                searchable: true,
                visible: true
            },
            {
                id: 'grade',
                label: 'Grade',
                isNumeric: true,
                visible: true,
                filterable: true
            },
            {
                id: 'class',
                label: 'Class',
                isNumeric: false,
                visible: true,
                filterable: true,
                values: ['Junior', 'Senior']
            }
        ];
        var tableLink = { label: 'Profile', key: 'profile', path: 'students' };
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'content --content-inner', id: 'content' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_StudentInfoDialog__WEBPACK_IMPORTED_MODULE_6__["StudentInfoDialog"], { open: this.state.addDialogOpen, onClose: this.onAddDialogClose, onSubmit: this.handleAddStudentSubmit }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_7__["EnhancedTable"], { showEmptyTable: false, title: 'Students', columns: columns, data: students, searchable: true, loading: this.state.loading, link: tableLink },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: 'Add Student' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { onClick: function () { return _this.onAddDialogOpen(); } },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Icon"], null, "add")))))));
    };
    return Students;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
var mapStateToProps = function (state) { return ({
    students: state.students.items,
    newStudent: state.students.item
}); };
var mapDispatchToProps = {
    createStudent: _actions_studentActions__WEBPACK_IMPORTED_MODULE_4__["createStudent"],
    fetchStudents: _actions_studentActions__WEBPACK_IMPORTED_MODULE_4__["fetchStudents"],
    queueSnackbar: _actions_snackbarActions__WEBPACK_IMPORTED_MODULE_3__["queueSnackbar"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Students));


/***/ })

},[["lI+E","runtime","vendors"]]]);
//# sourceMappingURL=main.js.map