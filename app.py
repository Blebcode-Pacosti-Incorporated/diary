import sys
from PySide6.QtCore import QUrl
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtWebEngineWidgets import QWebEngineView


class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()

        self.web_view = QWebEngineView(self)
        self.setCentralWidget(self.web_view)

        self.web_view.load(QUrl('https://b-diary.netlify.app/'))


if __name__ == '__main__':
    app = QApplication(sys.argv)
    main_window = MainWindow()
    main_window.show()
    sys.exit(app.exec())
