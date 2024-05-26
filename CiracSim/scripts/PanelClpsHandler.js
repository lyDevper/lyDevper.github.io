class PanelClpsHandler {
  constructor(clpsBtnId, panelCntId, isShow = true) {
    this.clpsBtn = document.getElementById(clpsBtnId);
    this.panelCnt = document.getElementById(panelCntId);
    this.isShow = isShow;

    this.clpsBtn.addEventListener('click', () => {
        this.togglePanel();
    });

    if (this.isShow) {
        this.showPanel();
    } else {
        this.hidePanel();
    }
  }

    showPanel() {
        this.panelCnt.style.display = 'flex';
        this.clpsBtn.style.transform = 'rotate(0deg)';
        this.isShow = true;
    }

    hidePanel() {
        this.panelCnt.style.display = 'none';
        this.clpsBtn.style.transform = 'rotate(-90deg)';
        this.isShow = false;
    }
  
    togglePanel() {
        console.log('togglePanel');
        if (this.isShow) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }

    static buildHandlers() {
        this.robotPara_handler = new PanelClpsHandler('clpsBtn_robotPara', 'panelCnt_robotPara', true);
        this.forward_handler = new PanelClpsHandler('clpsBtn_forward', 'panelCnt_forward', true);
        this.inverse_handler = new PanelClpsHandler('clpsBtn_inverse', 'panelCnt_inverse', true);
        this.fixedPara_handler = new PanelClpsHandler('clpsBtn_fixedPara', 'panelCnt_fixedPara', false);
        this.goalPos_handler = new PanelClpsHandler('clpsBtn_goalPos', 'panelCnt_goalPos', true);
        this.errorCmpst_handler = new PanelClpsHandler('clpsBtn_errorCmpst', 'panelCnt_errorCmpst', false);
    }

}