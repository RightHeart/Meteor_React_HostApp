var TestUtils = React.addons.TestUtils;

describe('UserInfo component', function() {

  var renderWithProps = function(props) {
    props = props || {};
    return renderComponent(UserInfo, props).getComponent();
  }, comp = renderWithProps();

  it('should have correct state defined', function() {
    expect(comp.state.name).not.toBeUndefined();
    expect(comp.state.email).not.toBeUndefined();
    expect(comp.state.phone).not.toBeUndefined();
  });

  it('should show error message if email is invalid', function() {
    comp.setState({email:'foo.bar'});
    var node = React.findDOMNode(comp.refs.emailTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.emailTextField.state.errorText).not.toBe('');
  });

  it('should remove error message if email is valid', function() {
    comp.setState({email:'foo.bar'});
    var node = React.findDOMNode(comp.refs.emailTextField);
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.emailTextField.state.errorText).not.toBe('');
    comp.setState({email:'foo@bar'});
    TestUtils.Simulate.blur($(node).find('input')[0]);
    expect(comp.refs.emailTextField.state.errorText).toBe('');
  });

  describe('with no props', function() {
    var comp = renderWithProps();

    it('state properties should be an empty string', function() {
      expect(comp.state.name).toBe('');
      expect(comp.state.email).toBe('');
      expect(comp.state.email).toBe('');
    });

    it('text fields should be empty', function() {
      expect(comp.refs.nameTextField.getValue()).toBe('');
      expect(comp.refs.emailTextField.getValue()).toBe('');
      expect(comp.refs.phoneTextField.getValue()).toBe('');
    });
  });

  describe('with all props defined', function() {
    var comp = renderWithProps({
      name: 'Foo Bar',
      email: 'foo@bar',
      phone: '0123456789'
    });

    it('state properties should not be empty', function(){
      expect(comp.state.name).toBe('Foo Bar');
      expect(comp.state.email).toBe('foo@bar');
      expect(comp.state.phone).toBe('0123456789');
    });

    it('text fields should equal state properties', function() {
      expect(comp.refs.nameTextField.getValue()).toBe('Foo Bar');
      expect(comp.refs.emailTextField.getValue()).toBe('foo@bar');
      expect(comp.refs.phoneTextField.getValue()).toBe('0123456789');
    });
  });

  describe('when you click update button', function() {

    beforeEach(function(){
      spyOn(UserActions, 'handleInfoUpdate');
    });

    it('with invalid email do not call handleInfoUpdate action', function() {
      comp.setState({email:'foo.bar'});
      var node = React.findDOMNode(comp.refs.updateButton);
      TestUtils.Simulate.click($(node).find('button')[0]);
      expect(UserActions.handleInfoUpdate).not.toHaveBeenCalled();
    });

    it('with a valid email should call handleInfoUpdate action', function() {
      comp.setState({email:'foo@bar'});
      var node = React.findDOMNode(comp.refs.updateButton);
      TestUtils.Simulate.click($(node).find('button')[0]);
      expect(UserActions.handleInfoUpdate).toHaveBeenCalled();
    });
  });

  describe('on update', function() {

    beforeEach(function() {
      spyOn(UserActions, 'handleInfoUpdate').and.callFake(function(d, cb) {
        cb();
      });
      spyOn(Notifier, 'showMessage').and.callThrough();
    });

    it('shows success Notifier', function() {
      comp.setState({email:'foo@bar'});
      comp._handleUpdateClick();
      expect(Notifier.showMessage).toHaveBeenCalled();
      expect(Notifier.getInstance().state.isError).toBe(false);
    });
  });

  describe('if there is an error on update', function() {

    beforeEach(function() {
      spyOn(UserActions, 'handleInfoUpdate').and.callFake(function(d, cb) {
        cb('error');
      });
      spyOn(Notifier, 'showError').and.callThrough();
    });

    it('shows error Notifier', function() {
      comp.setState({email:'foo@bar'});
      comp._handleUpdateClick();
      expect(Notifier.showError).toHaveBeenCalled();
      expect(Notifier.getInstance().state.isError).toBe(true);
    });
  });

});
