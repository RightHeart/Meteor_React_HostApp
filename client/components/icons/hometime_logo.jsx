// Copyright (c) 2016 Kayla Technologies All Rights Reserved.
let { PureRenderMixin } = React.addons;
let { Mixins } = mui;
let { StylePropable } = Mixins;

HometimeLogo = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    const { color, ...otherProps } = this.props;
    
    return (
      <svg width="100%" height="100%" viewBox="0 0 200 42" {...otherProps}>
        <g fill="none" stroke={color || '#39B0A4'}>
            <path strokeWidth="1.612" d="M29.941 15.408a8.284 8.284 0 0 1 7.027-12.673c4.578 0 8.288 3.71 8.288 8.282a8.256 8.256 0 0 1-1.285 4.435" />
            <path strokeWidth="1.612" strokeLinecap="round" d="M34.954 12.887a2.548 2.548 0 0 1 2.015-4.101 2.546 2.546 0 0 1 1.835 4.312" />
            <path strokeWidth="1.612" d="M27.71 17.902l-4.465-4.105-2.242 2.172 5.981 12.745" />
            <circle strokeWidth="3.225" cx="36.969" cy="23.951" r="11.064" />
        </g>
        <g fill={color || '#39B0A4'}>
          <path d="M4.557 11.325c0 1.97-.205 3.284-.656 4.679-.165.453.083.738.575.37 1.396-1.519 3.16-2.382 5.5-2.382 4.681 0 7.512 2.915 7.512 7.762v12.109c0 .285-.162.451-.452.451h-3.652c-.286 0-.453-.164-.453-.451V22.244c0-2.625-1.355-4.146-3.571-4.146-3.324 0-4.763 2.626-4.804 6.196v9.565c0 .283-.164.451-.451.451H.453c-.286.002-.453-.162-.453-.449V5.331c0-.287.166-.452.453-.452h3.653c.287 0 .452.165.452.452l-.001 5.994z" />
          <path d="M59.74 16.415c.246.492.492.492.985.041 1.559-1.766 3.365-2.464 5.334-2.464 2.341 0 4.229 1.149 5.337 2.749.534.574.903.452 1.396 0 1.805-2.134 3.653-2.749 5.623-2.749 4.598 0 7.225 2.915 7.225 7.76v12.109c0 .285-.164.451-.451.451h-3.695c-.287 0-.453-.164-.453-.451V22.244c0-2.586-1.066-4.146-3.242-4.146-3.118 0-4.514 2.424-4.514 6.197v9.564c0 .285-.166.453-.452.453H69.14c-.287 0-.453-.166-.453-.453V22.203c0-2.545-1.149-4.104-3.242-4.104-3.161 0-4.516 2.423-4.516 6.196v9.566c0 .283-.164.451-.452.451h-3.654c-.285 0-.452-.166-.452-.451V14.856c0-.287.165-.452.452-.452h2.052c.288 0 .452.121.493.41l.372 1.601z" />
          <path d="M107.229 29.277c-.082-.285-.287-.412-.574-.33l-1.807.455c-.861.285-2.091.412-3.242.412-2.583 0-4.227-1.355-4.675-3.529l6.445-.988c4.104-.615 6.033-2.424 6.033-5.584 0-4.063-2.996-6.526-7.926-6.526-5.988 0-9.521 3.982-9.521 10.386 0 6.364 3.49 10.387 9.688 10.387a17.514 17.514 0 0 0 4.187-.53l1.892-.494c.283-.084.41-.285.326-.574l-.826-3.085zm-5.827-11.987c2.218 0 3.486.864 3.486 2.505 0 1.066-.777 1.727-2.216 1.971l-6.157.984c.33-3.775 2.177-5.46 4.887-5.46z" />
          <path d="M126.48 14.403c.287 0 .455.164.455.452v3.16c0 .286-.166.451-.455.451h-4.6v9.976c0 1.396.619 2.179 1.604 2.179.369 0 .74-.038 1.068-.165.284-.123.49-.085.612.206l1.312 2.791c.123.248.041.45-.205.616-.737.41-1.808.697-2.791.697-3.899 0-6.156-2.341-6.156-6.32v-9.979h-2.012c-.287 0-.453-.165-.453-.451v-3.16c0-.287.166-.452.453-.452h2.012V9.683c0-.246.123-.41.367-.491l3.654-1.23c.328-.083.534.04.534.368v6.076l4.601-.003z" />
          <path d="M139.411 33.861c0 .287-.164.451-.452.451h-3.654c-.283 0-.451-.162-.451-.451V18.467h-2.012c-.287 0-.449-.165-.449-.451v-3.16c0-.287.16-.452.449-.452h6.117c.288 0 .452.164.452.452v19.005zm-.042-26.56c0 1.765-.982 2.791-2.708 2.791-1.724 0-2.748-1.026-2.748-2.791 0-1.724 1.022-2.748 2.748-2.748s2.708 1.026 2.708 2.748zm.042 26.56c0 .287-.164.451-.452.451h-3.654c-.283 0-.451-.162-.451-.451V18.467h-2.012c-.287 0-.449-.165-.449-.451v-3.16c0-.287.16-.452.449-.452h6.117c.288 0 .452.164.452.452v19.005zm-.042-26.56c0 1.765-.982 2.791-2.708 2.791-1.724 0-2.748-1.026-2.748-2.791 0-1.724 1.022-2.748 2.748-2.748s2.708 1.026 2.708 2.748z" />
          <path d="M150.331 16.415c.245.492.491.492.983.041 1.562-1.766 3.367-2.464 5.336-2.464 2.341 0 4.227 1.149 5.336 2.749.535.574.904.452 1.396 0 1.804-2.134 3.655-2.749 5.625-2.749 4.597 0 7.226 2.915 7.226 7.76v12.109c0 .285-.166.451-.453.451h-3.693c-.283 0-.451-.164-.451-.451V22.244c0-2.586-1.064-4.146-3.24-4.146-3.119 0-4.518 2.424-4.518 6.197v9.564c0 .285-.164.453-.453.453h-3.691c-.285 0-.455-.166-.455-.453V22.203c0-2.545-1.149-4.104-3.237-4.104-3.161 0-4.521 2.423-4.521 6.196v9.566c0 .283-.162.451-.451.451h-3.651c-.286 0-.45-.166-.45-.451V14.856c0-.287.161-.452.45-.452h2.051c.287 0 .454.121.493.41l.368 1.601z" />
          <path d="M197.822 30.084c-.084-.287-.288-.408-.575-.33l-1.808.455c-.859.287-2.092.412-3.242.412-2.581 0-4.223-1.354-4.678-3.533l6.443-.98c4.105-.619 6.035-2.426 6.035-5.586 0-4.062-2.998-6.527-7.92-6.527-5.996 0-9.525 3.982-9.525 10.386 0 6.362 3.49 10.388 9.688 10.388a17.087 17.087 0 0 0 4.189-.531l1.887-.494c.285-.084.41-.283.326-.576l-.82-3.084zm-5.827-11.986c2.215 0 3.485.859 3.485 2.504 0 1.068-.778 1.725-2.213 1.971l-6.16.985c.331-3.777 2.179-5.46 4.888-5.46z" />
        </g>
      </svg>
    );
  }
});