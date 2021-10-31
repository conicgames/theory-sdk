import { Popup } from "../api/ui/Popup";
import { Color } from "../api/ui/properties/Color";
import { ImageSource } from "../api/ui/properties/ImageSource";
import { Thickness } from "../api/ui/properties/Thickness";
import { ui } from "../api/ui/UI"

var id = "custom_ui_id";
var name = "Custom UI";
var description = "A custom theory to demonstrate UI capabilities."
var authors = "Gilles-Philippe Paillé"

var popup = ui.createPopup({
    title: "My Popup",
    content: ui.createStackLayout({
        children: [
            ui.createButton({text: "My Button", horizontalOptions: LayoutOptions.START}),
            ui.createCheckBox(),
            ui.createEntry(),
            ui.createFrame({
                heightRequest: 50,
                cornerRadius: 10,
                content: ui.createLabel({
                    text: "A frame.",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
                })
            }),
            ui.createGrid({
                columnDefinitions: ["20*", "30*", "auto"],
                children: [
                    ui.createButton({text: "left", row: 0, column: 0}),
                    ui.createButton({text: "center", row: 0, column: 1}),
                    ui.createButton({text: "right", row: 0, column: 2, padding: new Thickness(0)})
                ]
            }),
            ui.createImage({source: ImageSource.ACCELERATE}),
            ui.createLabel({text: "My label."}),
            ui.createLatexLabel({text: "My LaTeX label. \\(\\int_0^1{xdx}\\)"}),
            ui.createProgressBar({progress: 0.25}),
            ui.createSwitch(),
            ui.createBox({heightRequest: 1, margin: new Thickness(0, 10)}),
            ui.createButton({text: "Close", onClicked: () => popup.hide()})
        ]
    })
})

popup.show()