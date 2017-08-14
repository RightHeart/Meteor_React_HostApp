describe('ChangePassword component', function() {

  var renderWithProps = function(props) {
    props = props || {};
    return renderComponent(ChangePassword, props).getComponent();
  }, comp = renderWithProps();

  it('should have correct state defined', function() {
    expect(comp.state.password).not.toBeUndefined();
    expect(comp.state.newPassword).not.toBeUndefined();
    expect(comp.state.confirmPassword).not.toBeUndefined();
  });

  it('state properties should be null', function() {
    expect(comp.state.password).toBeNull();
    expect(comp.state.newPassword).toBeNull();
    expect(comp.state.confirmPassword).toBeNull();
  });

  it('should show error message if password is empty', function() {
    var node = React.findDOMNode(comp.refs.passwordTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.passwordTextField.state.errorText).not.toBe('');
  });

  it('should show error message if new password is empty', function() {
    var node = React.findDOMNode(comp.refs.newPasswordTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.newPasswordTextField.state.errorText).not.toBe('');
  });

  it('should show error message if new password is less than 8 characters', function() {
    comp.setState({newPassword: 'foo'});
    var node = React.findDOMNode(comp.refs.newPasswordTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.newPasswordTextField.state.errorText).not.toBe('');
  });

  it('error message disappears if more than 8 characters', function() {
    comp.setState({ newPassword: 'foo bar' });
    var node = React.findDOMNode(comp.refs.newPasswordTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.newPasswordTextField.state.errorText).not.toBe('');
    comp.setState({ newPassword: 'foo bar foo' });
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.newPasswordTextField.state.errorText).toBe('');
  });

  it('should show error message if confirm password does not match', function() {
    comp.setState({
      newPassword: 'foo bar foo',
      confirmPassword: 'foo bar',
    });
    var node = React.findDOMNode(comp.refs.confirmPasswordTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.confirmPasswordTextField.state.errorText).not.toBe('');
  });

  describe('when you click update button', function() {

    beforeEach(function(){
      spyOn(UserActions, 'handlePasswordChange');
    });

    it('with new password less than 8 do not call handlePasswordChange action', function() {
      comp.setState({
        password: 'foo',
        newPassword:'foobar',
        confirmPassword:'foobar',
      });
      var node = React.findDOMNode(comp.refs.updateButton);
      TestUtils.Simulate.click($(node).find('button')[0]);
      expect(UserActions.handlePasswordChange).not.toHaveBeenCalled();
    });

    it('with confirm password not matching do not call handlePasswordChange action', function() {
      comp.setState({
        password: 'foo',
        newPassword:'foobar foobar',
        confirmPassword:'foobar',
      });
      var node = React.findDOMNode(comp.refs.updateButton);
      TestUtils.Simulate.click($(node).find('button')[0]);
      expect(UserActions.handlePasswordChange).not.toHaveBeenCalled();
    });

    it('with all fields valid call handlePasswordChange action', function() {
      comp.setState({
        password: 'foo',
        newPassword: 'foobar foobar',
        confirmPassword: 'foobar foobar',
      });
      var node = React.findDOMNode(comp.refs.updateButton);
      TestUtils.Simulate.click($(node).find('button')[0]);
      expect(UserActions.handlePasswordChange).toHaveBeenCalled();
    });
  });

  describe('on update', function() {

    beforeEach(function() {
      spyOn(UserActions, 'handlePasswordChange').and.callFake(function(d, cb) {
        console.log('Calling handlePasswordChange');
        cb();
      });
      spyOn(Notifier, 'showMessage');

      comp.setState({
        password: 'foo',
        newPassword:'foobar foobar',
        confirmPassword:'foobar foobar',
      });
      comp._handleUpdateClick();
    });

    it('shows success Notifier', function() {
      expect(Notifier.showMessage).toHaveBeenCalled();
      expect(Notifier.getInstance().state.isError).toBe(false);
    });

    it('clears state back to default', function() {
      expect(comp.state).toEqual({
        password: null,
        newPassword: null,
        confirmPassword: null,
      });
    });
  });

  describe('if there is an error on update', function() {

    beforeEach(function() {
      spyOn(UserActions, 'handlePasswordChange').and.callFake(function(d, cb) {
        cb('error');
      });
      spyOn(Notifier, 'showError').and.callThrough();

      comp.setState({
        password: 'foo',
        newPassword:'foobar foobar',
        confirmPassword:'foobar foobar',
      });
      comp._handleUpdateClick();
    });

    it('shows error Notifier', function() {
      expect(Notifier.showError).toHaveBeenCalled();
      expect(Notifier.getInstance().state.isError).toBe(true);
    });

    it('sets error message on current password', function() {
      expect(comp.refs.passwordTextField.state.errorText).not.toBe('');
    });
  });

});