import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
/**
 * @namespace project4.controller
 */
export default class View1 extends Controller {
    public line: JSONModel = new JSONModel();
    public oDataModel : ODataModel;
    public dictVal = {} as any;

    
    public Lines =[
        { "Zone": "Z1" },
        { "Zone": "Z2" },
    ]
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        let oRouter = (this.getOwnerComponent() as any).getRouter()
        const countVal =0 
        // this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_EMP_MASTER_V2/")
        oRouter.getRoute("RouteView1").attachPatternMatched(this.getDetails, this);
    }
    public getDetails(oEvent: any): void {
       
        this.getView()!.setModel(this.line);
        this.line.setProperty("/Table",this.Lines)
        // this.byId("TableDetails")?.setModel(this.line, "DETAILS");
        // this.oDataModel.setDefaultBindingMode("TwoWay");
        // this.getView()!.setModel(this.oDataModel);
        // var that = this;
        // this.line.setProperty("/OrderDetailsTable", []);
 
       
    }



    public triggerValue(oEvent: any): void{
        let ucl =  this.line.getProperty("/UCL")|| Number(201.4);
        let lcl =  this.line.getProperty("/LCL") || Number(178.6);
        let val =  oEvent.getSource().getValue()
        let path = oEvent.getSource().getParent().getBindingContext().sPath
        let index =  oEvent.getSource().getParent().getIndex();
        let names =  oEvent.getSource().getParent().getBindingContext().getObject();
        console.log(names)
        if (!(index in this.dictVal)){
            this.dictVal[index] = 0;
        }
        if (val >=lcl && val<= ucl){
            this.dictVal[index] +=1
            let Calculation = (this.dictVal[index]/5)*100
            oEvent.getSource().getParent().getBindingContext().setObject()
            this.line.setProperty(path,{...oEvent.getSource().getBindingContext().getObject(),"ppu":Calculation})
         
        }

    }
}