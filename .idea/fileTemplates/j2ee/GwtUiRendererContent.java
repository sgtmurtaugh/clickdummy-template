#parse("Java File Header.java")

interface ${NAME}UiRenderer extends UiRenderer {
  void render(SafeHtmlBuilder sb, ${ELEMENT_TYPE} value);
  void onBrowserEvent(${NAME} cell, NativeEvent event, Element parent, ${ELEMENT_TYPE} value);
}

private static ${NAME}UiRenderer ourUiRenderer = GWT.create(${NAME}UiRenderer.class);

public ${NAME}() {
  super();
}

@Override
public void render(Context context, ${ELEMENT_TYPE} value, SafeHtmlBuilder builder) {
  ourUiRenderer.render(builder, value);
}

@Override
public void onBrowserEvent(Context context, Element parent, ${ELEMENT_TYPE} value,
                           NativeEvent event, ValueUpdater<${ELEMENT_TYPE}> updater) {
  ourUiRenderer.onBrowserEvent(this, event, parent, value);
}
