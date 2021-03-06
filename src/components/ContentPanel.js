import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const levelNames = ["Select your level", "Novice", "Advanced Beginner", "Practitioner", "Proficient", "Expert"];

class ContentPanel extends Component {

	constructor(props) {
		super(props);
		this.selectLevel = this.selectLevel.bind(this);
		this.state = {
			level: 0,
			levelName: levelNames[0],
			open: false,
			message: "",
			autoHideDuration: 0,
      };
    }

    selectLevel(event, value) {
		event.preventDefault();
		const levelName = value ? levelNames[value] : levelNames[0];
		this.handleClose();

		if (value) {
			this.handleOpen(levelName);
		}

		this.setState({
			level: value ? value : 0,
			levelName: levelName,
		});
    }

    handleOpen = (levelName) => this.setState({ open: true, message: `Level changed to ${levelName}`, autoHideDuration: 3000 });

  	handleClose = () => this.setState({ open: false, autoHideDuration: 0 });

	render() {

		const { classes } = this.props;
		const { expandedPanel, handleChange, identifier } = this.props;

		return(
			<React.Fragment>
			<ExpansionPanel 
				key={ identifier } 
				expanded={ expandedPanel === identifier } 
				onChange={ handleChange.bind(this, identifier) }
				onClick={this.handleClick}>
				        <ExpansionPanelSummary
				          expandIcon={<ExpandMoreIcon />}
				          aria-controls="panel4bh-content"
				          id="panel4bh-header"
				        >
			          	<Container>
			          		<Typography>Panel Title</Typography>
			          		<Container>
			                  <br/>
			                  <LinearProgress
			                  	variant="determinate"
			                    classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}
			                    value={ this.state.level * 20 }
			                  />
			                  <Typography align="right">
			                    { this.state.levelName }
			                  </Typography>
			                </Container>
			          	</Container>
			        </ExpansionPanelSummary>
			        <ExpansionPanelDetails>
			          <Grid>
			          	<Typography>
							Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
							vitae egestas augue. Duis vel est augue.
				        </Typography>
				          <br/>
				          <ToggleButtonGroup 
							  exclusive
							  value={this.state.level}
					          size="small" 
					          color="secondary" 
					          variant="contained" 
					          onChange={this.selectLevel}>
						      <ToggleButton key={1} value="1">
						        {levelNames[1]}
						      </ToggleButton>
						      <ToggleButton key={2} value="2">
						        {levelNames[2]}
						      </ToggleButton>
						      <ToggleButton key={3} value="3">
						        {levelNames[3]}
						      </ToggleButton>
						      <ToggleButton key={4} value="4">
						        {levelNames[4]}
						      </ToggleButton>
						      <ToggleButton key={5} value="5">
						        {levelNames[5]}
						      </ToggleButton>
					      </ToggleButtonGroup>
						</Grid>
			        </ExpansionPanelDetails>
			      </ExpansionPanel>

				<Snackbar
					anchorOrigin={{
			          vertical: 'bottom',
			          horizontal: 'right',
			        }}
			        autoHideDuration={this.state.autoHideDuration}
					open={this.state.open}
					onClose={this.handleClose}
					>
					<SnackbarContent
						style={{
							backgroundColor: '#03DAC5',
						}}
						message={this.state.message}
				    />
				</Snackbar>
		      </React.Fragment>
		);
	}
}

const styles = props => ({
  colorPrimary: {
    backgroundColor: '#E0E0E0',
  },
  barColorPrimary: {
    backgroundColor: '#BB86FC',
  }
});

export default  withStyles(styles)(ContentPanel);
