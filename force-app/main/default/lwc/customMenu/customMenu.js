import { LightningElement, api, track } from 'lwc';

export default class CustomMenuIcon extends LightningElement {
    @api iconName = 'utility:apps';
    @api menuAlignment = 'left';
    @track isMenuOpen = false;

    connectedCallback() {
        // Close on outside click
        this._boundDocClick = this.handleDocumentClick.bind(this);
        document.addEventListener('click', this._boundDocClick, true);

        // Close on Escape anywhere
        this._boundKeydown = (e) => {
            if (e.key === 'Escape') this.closeMenu();
        };
        window.addEventListener('keydown', this._boundKeydown, true);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._boundDocClick, true);
        window.removeEventListener('keydown', this._boundKeydown, true);
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        if (this.isMenuOpen) this.isMenuOpen = false;
    }

    handleSelect(event) {
        const value = event.currentTarget?.dataset?.value;
        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));
        this.closeMenu();
    }

    handleDocumentClick(event) {
        // If click is outside the component, close it
        const clickedInside = this.template.contains(event.target);
        if (!clickedInside) this.closeMenu();
    }

     onTriggerKeydown(event) {
        // Enter/Space opens; Down Arrow opens + focuses first item
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.isMenuOpen ? this.closeMenu() : this.toggleMenu();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!this.isMenuOpen) this.toggleMenu();
        }
    }

}