// Picture-in-Picture デモアプリケーション
class PictureInPictureDemo {
    constructor() {
        this.video = document.getElementById('video');
        this.pipButton = document.getElementById('pipButton');
        this.fullscreenButton = document.getElementById('fullscreenButton');
        this.statusElement = document.getElementById('status');
        this.pipStatusElement = document.getElementById('pipStatus');

        this.isPipSupported = false;
        this.isPipActive = false;

        this.init();
    }

    init() {
        this.checkPipSupport();
        this.setupEventListeners();
        this.updateStatus('アプリケーションを初期化中...');

        // 初期状態をチェック
        setTimeout(() => {
            this.checkCurrentPipState();
        }, 100);
    }

    // 現在のPiP状態をチェック
    checkCurrentPipState() {
        if (document.pictureInPictureElement === this.video) {
            this.isPipActive = true;
            this.updatePipStatus('Picture-in-Picture: アクティブ');
            this.pipButton.innerHTML = '<span class="pip-icon">📺</span>PiPを終了';
        } else {
            this.isPipActive = false;
            this.updatePipStatus('Picture-in-Picture: 無効');
            this.pipButton.innerHTML = '<span class="pip-icon">📺</span>Picture-in-Picture';
        }
    }

    // Picture-in-Picture サポートの確認
    checkPipSupport() {
        if ('pictureInPictureEnabled' in document) {
            this.isPipSupported = document.pictureInPictureEnabled;
        } else if (this.video.requestPictureInPicture) {
            this.isPipSupported = true;
        }

        if (this.isPipSupported) {
            this.pipButton.disabled = false;
            this.updatePipStatus('Picture-in-Picture: 利用可能');
        } else {
            this.updatePipStatus('Picture-in-Picture: サポートされていません');
            this.updateStatus('お使いのブラウザはPicture-in-Pictureをサポートしていません。');
        }
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // Picture-in-Picture ボタン
        this.pipButton.addEventListener('click', () => {
            this.togglePictureInPicture();
        });

        // ビデオイベント
        this.video.addEventListener('loadedmetadata', () => {
            this.updateStatus('ビデオの読み込み完了');
        });

        this.video.addEventListener('play', () => {
            this.updateStatus('ビデオを再生中');
        });

        this.video.addEventListener('pause', () => {
            this.updateStatus('ビデオを一時停止');
        });

        this.video.addEventListener('error', (e) => {
            this.updateStatus('ビデオの読み込みエラー: ' + e.message);
        });

        // Picture-in-Picture イベント
        document.addEventListener('enterpictureinpicture', (event) => {
            this.isPipActive = true;
            this.updatePipStatus('Picture-in-Picture: アクティブ');
            this.updateStatus('Picture-in-Pictureモードに切り替わりました');
            this.pipButton.innerHTML = '<span class="pip-icon">📺</span>PiPを終了';
        });

        document.addEventListener('leavepictureinpicture', (event) => {
            this.isPipActive = false;
            this.updatePipStatus('Picture-in-Picture: 無効');
            this.updateStatus('通常モードに戻りました');
            this.pipButton.innerHTML = '<span class="pip-icon">📺</span>Picture-in-Picture';
        });
    }

    // Picture-in-Picture の切り替え
    async togglePictureInPicture() {
        if (!this.isPipSupported) {
            this.showNotification('Picture-in-Pictureはサポートされていません', 'error');
            return;
        }

        try {
            // 現在のPiP状態を確認
            const isCurrentlyInPip = document.pictureInPictureElement === this.video;

            if (isCurrentlyInPip) {
                await document.exitPictureInPicture();
            } else {
                await this.video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('Picture-in-Picture エラー:', error);
            this.showNotification('Picture-in-Pictureの切り替えに失敗しました: ' + error.message, 'error');

            // エラーが発生した場合、状態をリセット
            this.isPipActive = false;
            this.updatePipStatus('Picture-in-Picture: 無効');
            this.pipButton.innerHTML = '<span class="pip-icon">📺</span>Picture-in-Picture';
        }
    }

    // ステータスの更新
    updateStatus(message) {
        this.statusElement.textContent = message;
    }

    // Picture-in-Picture ステータスの更新
    updatePipStatus(message) {
        this.pipStatusElement.textContent = message;
    }

    // 通知の表示
    showNotification(message, type = 'info') {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // スタイルを適用
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        if (type === 'error') {
            notification.style.background = '#e74c3c';
        } else if (type === 'success') {
            notification.style.background = '#27ae60';
        } else {
            notification.style.background = '#3498db';
        }

        document.body.appendChild(notification);

        // アニメーション
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自動削除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // ビデオの再生状態を取得
    getVideoState() {
        return {
            paused: this.video.paused,
            ended: this.video.ended,
            duration: this.video.duration,
            currentTime: this.video.currentTime,
            volume: this.video.volume,
            muted: this.video.muted
        };
    }

    // ビデオの再生状態を設定
    setVideoState(state) {
        if (state.paused !== undefined) {
            if (state.paused) {
                this.video.pause();
            } else {
                this.video.play();
            }
        }

        if (state.currentTime !== undefined) {
            this.video.currentTime = state.currentTime;
        }

        if (state.volume !== undefined) {
            this.video.volume = state.volume;
        }

        if (state.muted !== undefined) {
            this.video.muted = state.muted;
        }
    }
}

// ページ読み込み完了後にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
    const app = new PictureInPictureDemo();

    // デバッグ用にグローバルに公開
    window.pipDemo = app;

});

// エラーハンドリング
window.addEventListener('error', (event) => {
    console.error('グローバルエラー:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('未処理のPromise拒否:', event.reason);
});

