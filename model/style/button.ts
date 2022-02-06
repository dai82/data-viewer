export class ButtonStyle {
    public width?: string = 'auto'
    public height?: string = 'auto'
    public minWidth?: string = '0px'
    public backgroundColor?: string = '#0099e5'
    public borderColor?: string = '#0099e5'
    public borderWidth?: string = '0px'
    public color?: string = 'white'
    public margin?: string = '0px'
    public marginTop?: string = '0px'
    public marginRight?: string = '0px'
    public marginBottom?: string = '0px'
    public marginLeft?: string = '0px'
    public paddingLeft?: string = '0px'
    public paddingRight?: string = '0px'
}

export default {
    miniButtonStyle(): ButtonStyle {
        return {
            minWidth: '80px',
            width: 'auto',
            backgroundColor: '#0099e5',
            borderColor: '#0099e5',
            borderWidth: '1px',
            color: 'white',
            margin: '4px',
            paddingLeft: '4px',
            paddingRight: '4px'
        }
    },
    attachFileButtonStyle(): ButtonStyle {
        return {
            minWidth: '160px',
            width: 'auto',
            backgroundColor: '#0099e5',
            borderColor: '#0099e5',
            borderWidth: '1px',
            color: 'white',
            margin: '4px',
            paddingLeft: '4px',
            paddingRight: '4px'
        }
    },
}
